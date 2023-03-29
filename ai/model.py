import tensorflow as tf
import numpy as np
import math
import tqdm
import wandb
import os.path
from os import path
import csv

class ArcMarginProduct(tf.keras.layers.Layer):
    def __init__(self, n_classes, s=30, m=0.50, easy_margin=False,
                 ls_eps=0.0, **kwargs):

        super(ArcMarginProduct, self).__init__(**kwargs)

        self.n_classes = n_classes
        self.s = s
        self.m = m
        self.ls_eps = ls_eps
        self.easy_margin = easy_margin
        self.cos_m = tf.math.cos(m)
        self.sin_m = tf.math.sin(m)
        self.th = tf.math.cos(math.pi - m)
        self.mm = tf.math.sin(math.pi - m) * m

    def build(self, input_shape):
        super(ArcMarginProduct, self).build(input_shape[0])

        self.W = self.add_weight(
            name='/',
            shape=(int(input_shape[0][-1]), self.n_classes),
            initializer='glorot_uniform',
            dtype='float32',
            trainable=True,
            regularizer=None)

    def call(self, inputs):
        X, y = inputs
        y = tf.cast(y, dtype=tf.int32)
        cosine = tf.matmul(
            tf.math.l2_normalize(X, axis=1),
            tf.math.l2_normalize(self.W, axis=0)
        )
        sine = tf.math.sqrt(1.0 - tf.math.pow(cosine, 2))
        phi = cosine * self.cos_m - sine * self.sin_m
        if self.easy_margin:
            phi = tf.where(cosine > 0, phi, cosine)
        else:
            phi = tf.where(cosine > self.th, phi, cosine - self.mm)
        one_hot = tf.cast(
            tf.one_hot(y, depth=self.n_classes),
            dtype=cosine.dtype
        )
        if self.ls_eps > 0:
            one_hot = (1 - self.ls_eps) * one_hot + self.ls_eps / self.n_classes

        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)
        output *= self.s
        return output


def create_model(input_shape,
                 n_classes,
                 dense_units=512,
                 dropout_rate=0.0,
                 scale=30,
                 margin=0.3):
    backbone = tf.keras.applications.ResNet50(
        include_top=False,
        input_shape=input_shape,
        weights=('imagenet')
    )

    pooling = tf.keras.layers.GlobalAveragePooling2D(name='head/pooling')
    dropout = tf.keras.layers.Dropout(dropout_rate, name='head/dropout')
    dense = tf.keras.layers.Dense(dense_units, name='head/dense')

    margin = ArcMarginProduct(
        n_classes=n_classes,
        s=scale,
        m=margin,
        name='head/arc_margin',
        dtype='float32')

    softmax = tf.keras.layers.Softmax(dtype='float32')

    image = tf.keras.layers.Input(input_shape, name='input/image')
    label = tf.keras.layers.Input((), name='input/label')

    x = backbone(image)
    x = pooling(x)
    x = dropout(x)
    x = dense(x)
    x = margin([x, label])
    x = softmax(x)
    return tf.keras.Model(
        inputs=[image, label], outputs=x)


class DistributedModel:

    def __init__(self,
                 input_size,
                 n_classes,
                 batch_size,
                 finetuned_weights,
                 dense_units,
                 dropout_rate,
                 scale,
                 margin,
                 optimizer,
                 strategy,
                 mixed_precision,
                 clip_grad,
                 wandb_log):

        self.model = create_model(
            input_shape=input_size,
            n_classes=n_classes,
            dense_units=dense_units,
            dropout_rate=dropout_rate,
            scale=scale,
            margin=margin, )

        self.input_size = input_size
        self.global_batch_size = batch_size * strategy.num_replicas_in_sync

        if finetuned_weights:
            self.model.load_weights(finetuned_weights)

        self.mixed_precision = mixed_precision
        self.optimizer = optimizer
        self.strategy = strategy
        self.clip_grad = clip_grad
        self.wandb = wandb_log

        # loss function
        self.loss_object = tf.keras.losses.SparseCategoricalCrossentropy(
            from_logits=False, reduction=tf.keras.losses.Reduction.NONE)

        # metrics
        self.mean_loss_train = tf.keras.metrics.SparseCategoricalCrossentropy(
            from_logits=False)
        self.mean_accuracy_train = tf.keras.metrics.SparseTopKCategoricalAccuracy(
            k=1)

        self.mean_loss_valid = tf.keras.metrics.SparseCategoricalCrossentropy(
            from_logits=False)
        self.mean_accuracy_valid = tf.keras.metrics.SparseTopKCategoricalAccuracy(
            k=1)

        if self.optimizer and self.mixed_precision:
            self.optimizer = \
                tf.keras.mixed_precision.experimental.LossScaleOptimizer(
                    optimizer, loss_scale='dynamic')

        self.train_loss_history = []
        self.train_acc_history = []
        self.valid_loss_history = []
        self.valid_acc_history = []

    def _predict_step(self, inputs):
        probs = self.model(inputs, training=False)
        return probs

    @tf.function
    def _distributed_predict_step(self, dist_inputs):
        probs = self.strategy.run(self._predict_step, args=(dist_inputs,))
        return probs

    def predict2(self, test_ds, area):
        print(">> in model", area)
        class_list = read_classes(area)
        dist_test_ds = self.strategy.experimental_distribute_dataset(test_ds)
        dist_test_ds = tqdm.tqdm(dist_test_ds)

        # # Iterate over the distributed test dataset
        for inputs in dist_test_ds:
            probs_replicates = self._distributed_predict_step(inputs)
            probs_replicates = self.strategy.experimental_local_results(probs_replicates)
            for prob in probs_replicates:
                m = tf.gather(tf.shape(prob), 0)
                probs_argsort = tf.argsort(prob, direction='DESCENDING')

        print("★probs_argsort\n", probs_argsort)

        probs = []  # 확률 top5
        classes = []  # 관광지이름 top5

        for i in range(5):
            idx = probs_argsort[0][i]  # 상위권 인덱스
            probs.append(prob[0][idx].numpy())  # 상위권 확률
            classes.append(class_list[idx.numpy()])

        return classes, probs

def read_classes(area):
    classes = []
    f = open("./data/class/" + area + "/class.csv", "rt", encoding='UTF8')
    reader = csv.reader(f)

    for row in reader:
        classes.append(row[0])
    return classes