# flask app
from flask import Flask, render_template, url_for, request, redirect
from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin
import os
# import model

app = Flask(__name__, template_folder='Template')
cors = CORS(app)
Bootstrap(app)
"""
Routes
"""
@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        uploaded_file = request.files['file']

        # 파일이 업로드가 되면 result.html로 이동
        if uploaded_file.filename != '':
            image_path = os.path.join('static', uploaded_file.filename) # 이미지 저장
            print(">>> image_path", image_path)
            uploaded_file.save(image_path)
        #
        #     # 사진 예측
        #     classes, probs = model.pred_image(image_path)
        #     result = {
        #         'class_name': classes,
        #         'probs': probs,
        #         'image_path': image_path,
        #     }
            return "이미지 업로드"

    return "IMG Tag"
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)