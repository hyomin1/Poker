# Poker Game
> **개발기간: 2024.01 ~ 2024.02**

## 참여자
|      이효민       |          정찬         |                                                                                                              
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/hyomin1"/> | <img width="160px" src="https://avatars.githubusercontent.com/lushlife99"/> |
|   [@hyomin1](https://github.com/hyomin1)   |    [@lushlife99](https://github.com/lushlife99)  |
| 프론트엔드 | 백엔드 | 

## 시작 가이드
### Requirements
- [Node.js 18.17.1](https://nodejs.org/en)
- [Npm 8.19.3](https://www.npmjs.com/package/npm/v/8.19.2)

### Installation
``` bash
$ git clone https://github.com/hyomin1/poker.git
$ cd poker
```
#### Frontend
```
$ cd poker
$ npm install 
$ npm start
```

---

## 📚Stacks

### **Environment**
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)         

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)     

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

---
### 주요 화면
| 로그인 | 
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/1fb29e2f-5ef1-47e7-976b-8e0ab52666e1"/>|

| 이미지 업로드 |
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/213257bb-5cd6-4ff2-b7f2-a087184f238f"/>|

| 메인화면 |
| :-------------------------------------------: |
|<img width="800" src="https://github.com/hyomin1/poker/assets/98298940/f093b095-fd50-48ca-baa8-dcab0c5fa3e1">|

| 게임플레이 |
| :-------------------------------------------: |
| <img width="800"/>|

| 게임결과1 |
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/726b5241-5725-4911-8a65-c3741935c163"/>|

| 게임결과2 |
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/566665aa-c14e-4d90-a427-acc76c4c2f64"|

| HUD |
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/f9768842-c59c-43be-84e5-03001602d415"/>|

| 핸드히스토리 |
| :-------------------------------------------: |
| <img width="800" src="https://github.com/hyomin1/poker/assets/98298940/34c25555-29bb-4299-b1f2-9af0e8116c60"/>|

---
## 주요 기능

### 게임 매칭

### 

###


---
## 아키텍쳐

### 디렉토리 구조

```bash
├── README.md
├── package-lock.json
├── package.json
├── .gitignore
└── src
    │   ├── Start.js : 처음 실행시 나타나는 화면
    │   ├── Router.js : 페이지 경로 정리
    │   ├── index.js
    │   ├── client.js : StompJS 객체 생성
    │   ├── App.js
    │   └── api.js
    ├── login
    |   ├── Join.js : 회원가입
    |   ├── Login.js : 로그인
    |   └── Main.css
    ├── user
    |   ├── Hud.js : 플레이어 HUD 정보 확인
    |   ├── UserProfile.js
    |   └── user.css
    ├── handHistory
    |   ├── HandHistory.js : 플레이어의 핸드히스토리 확인
    |   └── HandHistoryTable.js : 핸드히스토리에 필요한 테이블
    ├── game
    │   ├── Game.js
    │   ├── GameRoom.js : 게임방 입장시 화면
    │   ├── GameRoomList.js : 블라인드 별 화면 구성
    │   ├── Playing.js : 게임중 화면
    │   ├── Waiting.js : 대기중 화면
    │   └── gameComponents
    │       ├── CardComponent.js : 커뮤니티 카드 
    │       ├── Player.js : 게임에 입장하는 플레이어
    │       └── TableComponent.js : 게임 화면에서 사용하는 포커 테이블
    └──public
       └── images : 52장 카드 이미지 
  
    

```




  

