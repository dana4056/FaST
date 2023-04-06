# flask app
import easydict
import numpy as np
import tensorflow as tf
import pandas as pd
from flask import Flask, render_template, url_for, request, redirect, make_response
# from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin

import os
import argparse
import logging

from model import DistributedModel

import warnings
import csv
import ssl

tf.get_logger().setLevel(logging.ERROR)
np.set_printoptions(threshold=np.inf, linewidth=np.inf)  # inf = infinity

warnings.filterwarnings("ignore")

options = easydict.EasyDict({
    "gpus": '5',
})

os.environ["CUDA_VISIBLE_DEVICES"] = options.gpus

gpus = tf.config.experimental.list_physical_devices('GPU')
num_gpus = len(gpus)
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        logical_gpus = tf.config.experimental.list_logical_devices('GPU')
        print(num_gpus, "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        print(e)


if num_gpus == 0:
    strategy = tf.distribute.OneDeviceStrategy(device='CPU')
    print("Setting strategy to OneDeviceStrategy(device='CPU')")
elif num_gpus == 1:
    strategy = tf.distribute.OneDeviceStrategy(device='GPU')
    print("Setting strategy to OneDeviceStrategy(device='GPU')")
else:
    strategy = tf.distribute.MirroredStrategy()
    print("Setting strategy to MirroredStrategy()")

app = Flask(__name__)

cors = CORS(app, resources={r"/article/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def test():
    return "https 성공"


@app.route('/article/image', methods=['POST'])
def index():

    uploaded_file = request.files['file']   # 업로드된 이미지
    area = request.form['area']             # 지역명
    checkpoint_path = './checkpoint/' + area + '/checkpoint'
    print("> 지역:", area)
    print("> checkpoint path:", checkpoint_path)

    class_list = read_classes(area)

    # 파일 업로드 되면
    if uploaded_file.filename != '':
        config = {
            'learning_rate': 1e-3,
            'momentum': 0.9,
            'input_size': (224, 224, 3),
            'n_classes': len(class_list),
            'scale': 30,
            'margin': 0.1,
            'clip_grad': 10.0,
            'n_epochs': 100,
            'batch_size': 1,
            'dense_units': 512,
            'dropout_rate': 0.0,
            'save_interval': 50,
            'wandb': False,
            'CITY_NAME': area
        }

        # 이미지 불러오기 및 전처리
        image_path = os.path.join('static', uploaded_file.filename)  # 이미지 저장
        print("> save path:", image_path)
        uploaded_file.save(image_path)

        image = read_image(image_path)
        image = preprocess_input(image, config['input_size'][:2])
        image = np.reshape(image, (1, 224, 224, 3))

        with strategy.scope():
            optimizer = tf.keras.optimizers.SGD(config['learning_rate'], momentum=config['momentum'])

            dist_model = DistributedModel(
                input_size=config['input_size'],
                n_classes=config['n_classes'],
                batch_size=config['batch_size'],
                finetuned_weights= checkpoint_path,
                dense_units=config['dense_units'],
                dropout_rate=config['dropout_rate'],
                scale=config['scale'],
                margin=config['margin'],
                optimizer=optimizer,
                strategy=strategy,
                mixed_precision=False,
                clip_grad=config['clip_grad'],
                wandb_log=config['wandb'])

            label = pd.DataFrame([-1])
            dataset = tf.data.Dataset.from_tensor_slices((image, label))

            option = tf.data.Options()
            option.experimental_distribute.auto_shard_policy = tf.data.experimental.AutoShardPolicy.FILE
            dataset = dataset.with_options(option)

            dataset = dataset.map(lambda x, y: (x, tf.squeeze(y)))
            dataset = dataset.batch(1)

            classes, probs = dist_model.predict2(test_ds=dataset, area=config['CITY_NAME'])
        print(">> top5 landmark", classes)
        print(">> top5 probs", probs)

        tags = []

        for i in range(5):
            if probs[i] >= 0.8:
                tags.append(classes[i])

        response = make_response(tags)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")

        os.remove('static/'+uploaded_file.filename)
        return response
    return "No Image"

def read_image(image_path):
    image = tf.io.read_file(image_path)
    return tf.image.decode_jpeg(image, channels=3)

def preprocess_input(image, target_size):
    image = tf.image.resize(
        image, target_size, method='bilinear')

    image = tf.cast(image, tf.float32)
    image /= 255.

    return image

def read_classes(area):
    print("> class path:", "./data/class/" + area + "/class.csv")
    classes = []
    f = open("./data/class/" + area + "/class.csv", "rt", encoding='UTF8')
    reader = csv.reader(f)

    for row in reader:
        classes.append(row[0])
    print('> class len', len(classes))
    return classes

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    print(ssl_context)
    ssl_context.load_cert_chain(certfile='cert.pem', keyfile='privkey.pem', password='a402')
    app.run(host='0.0.0.0', debug=True)
