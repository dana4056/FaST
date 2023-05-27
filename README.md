# FaST (스마트 여행기록 SNS)

### Fast and Smart Travel✈️
![image](https://user-images.githubusercontent.com/54545026/231183441-c592cfd2-f8ca-434b-b512-ca411eadfb07.png)


## 📺 시연 영상
https://youtu.be/T1_tlWxepn8

<br>

## 1. 프로젝트 진행 기간

📅 2023.02.27(월) ~ 2023.04.07(금) <br>

<br>

## 2. 서비스 기획 배경

어디로 여행을 갔었는지 기억이 잘 나시나요? <br>
여행 사진을 찾아보려면 핸드폰 사진첩에서 꽤 오랜 시간이 걸리진 않으신가요? <br>
여행 사진을 올리면 AI 예측 모델을 통해 여행지를 자동 태그해주고, 태그와 지역별로 모아볼 수 있는 여행기록 SNS FaST 입니다.<br>


<br>

## 3. 서비스 개요

✅ 본인이 다녀온 여행지에 대해 사진과 글로 기록<br>
✅ ResNet101+ArcFace로 전국의 랜드마크를 학습시켜 예측모델 구축.<br>
✅ 예측모델로 랜드마크를 인식해 자동태그를 생성<br>
✅ 관심태그별로 게시글을 조회<br>
✅ 팔로우, 팔로잉 기능을 통해 친구 간의 게시물을 확인.<br>
✅ 기록한 태그 및 관심 태그 기반 여행지 게시물 추천<br>

<br>

## 4. 기술스택

### FrontEnd

| <div align="center"><img src="/assets/images/html.svg" alt="HTML5" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/css.svg" alt="CSS3" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/TypeScript.png" alt="TypeScript" width="50px" height="50px" /></div> |
| :-----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
|HTML5|CSS3 | TypeScript|

| <div align="center"><img src="/assets/images/React.png" alt="React" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/Node.png" alt="NodeJS" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/Recoil.svg" alt="Pinia" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/Sass.png" alt="tailwindCSS" width="50px" height="50px" /> </div> |
| :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
|React|Node.js|Recoil| Sass |

### BackEnd & AI

| <div align="center"><img src="/assets/images/java.svg" alt="java" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/springboot.png" alt="springboot" width="100px" height="50px" /> </div> | <div align="center"><img src="/assets/images/springsecurity.png" alt="springsecurity" width="100px" height="50px" /></div> | <div align="center"><img src="/assets/images/Python.png" alt="gradle" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/Flask.png" alt="Flask" width="50px" height="50px" /></div> |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| Java  | Spring-Boot |Spring-Security |Python|Flask|

| <div align="center"><img src="/assets/images/mysql.svg" alt="mysql" width="70px" height="50px" /> </div> | <div align="center"><img src="/assets/images/JPA.png" alt="JPA" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/Tensorflow.png" alt="Tensorflow" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/Keras.png" alt="Keras" width="50px" height="50px" /></div> |
| :------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |:--------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | 
| Mysql|  JPA  |Tensorflow | keras  | 


### DevOps
NginX Docker AWS EC2 jenkins
| <div align="center"><img src="/assets/images/docker.png" alt="docker" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/images/nginx.png" alt="nginx" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/ec2.png" alt="EC2" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/images/Jenkins.png" alt="Jenkins" width="50px" height="50px" /></div> |
| :--------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |:-----------------------------------------------------------------------------------------------: |
| Docker|NginX | AWS EC2 | Jenkins |

## 5. 시스템 구성도

![구성도](./images/architecture.PNG)

## 6. 와이어프레임

![와이어프레임](./images/wire_frame.PNG)
*Figma 사용 <br>


## 7. 팀원 소개

| 이름   | 역할 | 담당                                |
| ------ | ---- | ----------------------------------- |
| 이소민 | 팀장 | Frontend 개발 + 디자인  |
| 박세희 | 팀원 | Frontend 개발 + 디자인              |
| 고태진 | 팀원 | Frontend 개발 + CI/CD + 무중단배포            |
| 정다은 | 팀원 | Backend 개발 + AI 모델 학습 및 예측 모델 구축 |
| 오준호 | 팀원 | Backend 개발 + API 설계 및 관리    |


<br>

## 8. AI 모델 및 데이터
✈ <b>데이터셋([AI Hub 랜드마크 이미지](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=56))</b> - `서울`, `인천`, `경상북도`, `제주`, `부산` 지역 675개 랜드마크 학습 <br>
✈<b>AI 모델</b>: RestNet101 + ArcFace 

![model](https://user-images.githubusercontent.com/50287759/222605834-d81982d6-5817-499f-b298-cf7cca787913.png)



📃 <b>[학습 기록 보러가기](https://clammy-opossum-12e.notion.site/FaST-a16de228d5544c0da9528aa06fa9c351)</b>

