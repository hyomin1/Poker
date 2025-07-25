# Poker Game

<div align="center">
  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)

<h3>실시간 최대 6인 멀티플레이어 포커 게임</h3>

</div>

## 📌 프로젝트 개요

**Poker Game**은 실시간 웹소켓 통신을 활용한 멀티플레이어 포커 게임입니다.

- **개발 기간**: 2024.01 ~ 2024.02
- **개발 인원**: 2명 (본인: 프론트엔드 담당)
- **프로젝트 배경**: 
  - 개발 공부를 처음 시작했을 때 HTTP 통신만으로 포커 게임을 구현하려 했습니다.
  - 게임 동작의 실시간성이 부족하여 STOMP JS를 도입, 웹소켓 통신으로 최대 6명이 동시 플레이 가능한 포커 게임을 구현했습니다.
- **주요 성과**:
  - HTTP 통신 방식에서 발생했던 게임 상태 지연 문제를 WebSocket 도입으로 체감할 수 있을 만큼 개선하여 실시간성 확보
  - props drilling 문제를 Zustand로 전역 상태 관리를 적용해 코드 가독성과 유지보수성 향상
  - react-query와 STOMP JS를 커스텀 훅으로 분리해 비동기 로직과 실시간 통신 모듈화, 코드의 재사용성 및 유지보수성 강화

## 👨‍💻 참여자

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hyomin1">
        <img src="https://avatars.githubusercontent.com/hyomin1" width="160px" alt="이효민"/>
        <br />
        <sub><b>이효민</b></sub>
      </a>
      <br />
      <sub>프론트엔드</sub>
    </td>
    <td align="center">
      <a href="https://github.com/lushlife99">
        <img src="https://avatars.githubusercontent.com/lushlife99" width="160px" alt="정찬"/>
        <br />
        <sub><b>정찬</b></sub>
      </a>
      <br />
      <sub>백엔드</sub>
    </td>
  </tr>
</table>

## 🛠️ 기술 스택

<table>
  <tr>
    <th width="200">영역</th>
    <th>기술</th>
  </tr>
  <tr>
    <td><b>프론트엔드</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=Javascript&logoColor=black" alt="JavaScript" />
      <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
      <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white" alt="Bootstrap" />
    </td>
  </tr>
  <tr>
    <td><b>상태 관리</b></td>
    <td>
      <img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white" alt="Zustand" />
      <img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" alt="React Query" />
    </td>
  </tr>
  <tr>
    <td><b>실시간 통신</b></td>
    <td>
      <img src="https://img.shields.io/badge/STOMP_JS-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="STOMP JS" />
      <img src="https://img.shields.io/badge/WebSocket-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="WebSocket" />
    </td>
  </tr>
  <tr>
    <td><b>인증</b></td>
    <td>
      <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white" alt="JWT" />
    </td>
  </tr>
  <tr>
    <td><b>테스트</b></td>
    <td>
      <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest" />
      <img src="https://img.shields.io/badge/React_Testing_Library-E33332?style=flat-square&logo=testing-library&logoColor=white" alt="React Testing Library" />
    </td>
  </tr>
  <tr>
    <td><b>개발 환경</b></td>
    <td>
      <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=Visual%20Studio%20Code&logoColor=white" alt="Visual Studio Code" />
      <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" alt="Git" />
      <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub" />
      <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm" />
    </td>
  </tr>
</table>

## 🚀 주요 기능

### 1. 실시간 멀티플레이어 게임 로직 구현 (최대 6명 동시 플레이)

- STOMP JS 기반 웹소켓을 활용한 실시간 게임 상태 동기화
- 턴 기반 게임 로직 및 플레이어 간 실시간 상호작용 구현
- 포커 게임 규칙에 따른 베팅, 콜, 레이즈, 폴드 등 다양한 액션 처리
- 실시간 게임 진행 상황 및 결과 표시

### 2. 사용자 인증 및 게임룸 관리 시스템

- JWT 토큰 기반 사용자 인증 구현
- 게임룸 생성, 참여, 퇴장 기능 개발
- 블라인드 별 게임룸 분류 및 선택 기능

### 3. 상태 관리 및 API 통신 최적화

- React Query 커스텀 훅으로 API 통신 로직 모듈화하여 코드 재사용성 및 유지보수성 향상
- STOMP JS 웹소켓 연결 및 구독 로직을 커스텀 훅으로 분리하여 컴포넌트 간 일관된 사용성 제공
- Zustand를 활용한 전역 상태 관리로 컴포넌트 간 데이터 흐름 개선 및 props drilling 문제 해결

### 4. 게임 통계 및 플레이어 데이터 관리

- 플레이어별 HUD(Heads-Up Display) 통계 정보 제공
- 핸드 히스토리 기록 및 조회 기능
- 게임 결과에 따른 플레이어 정보 업데이트

## 📱 주요 화면

<table>
  <tr>
    <td align="center"><b>로그인</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/1fb29e2f-5ef1-47e7-976b-8e0ab52666e1"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>이미지 업로드</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/213257bb-5cd6-4ff2-b7f2-a087184f238f"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>메인화면</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/f093b095-fd50-48ca-baa8-dcab0c5fa3e1"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>게임플레이</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/ae2c5cc7-230f-4692-b27b-f8321e27aa74"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>게임결과 1</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/726b5241-5725-4911-8a65-c3741935c163"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>게임결과 2</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/566665aa-c14e-4d90-a427-acc76c4c2f64"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>HUD</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/f9768842-c59c-43be-84e5-03001602d415"/>
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>핸드히스토리</b></td>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/hyomin1/poker/assets/98298940/34c25555-29bb-4299-b1f2-9af0e8116c60"/>
    </td>
  </tr>
</table>

## 📝 프로젝트 구조

```bash
├── README.md
├── package-lock.json
├── package.json
├── .gitignore
└── src
    │   ├── Start.js                 # 처음 실행시 나타나는 화면
    │   ├── Router.js                # 페이지 경로 정리
    │   ├── index.js
    │   ├── client.js                # StompJS 객체 생성
    │   ├── App.js
    │   └── api.js                   # API 통신 로직
    ├── hooks
    │   ├── useStompClient.js        # 웹소켓 연결 관리 커스텀 훅
    │   ├── useGameState.js          # 게임 상태 관리 커스텀 훅
    │   └── useApiQuery.js           # API 요청 관리 커스텀 훅
    ├── store
    │   ├── gameStore.js             # 게임 상태 관리 (Zustand)
    │   ├── userStore.js             # 사용자 정보 관리 (Zustand)
    │   └── roomStore.js             # 게임룸 관리 (Zustand)
    ├── login
    │   ├── Join.js                  # 회원가입
    │   ├── Login.js                 # 로그인
    │   └── Main.js
    ├── user
    │   ├── Hud.js                   # 플레이어 HUD 정보 확인
    │   ├── UserProfile.js
    │   └── user.css
    ├── handHistory
    │   ├── HandHistory.js           # 플레이어의 핸드히스토리 확인
    │   └── HandHistoryTable.js      # 핸드히스토리에 필요한 테이블
    ├── game
    │   ├── Game.js
    │   ├── GameRoom.js              # 게임방 입장시 화면
    │   ├── GameRoomList.js          # 블라인드 별 화면 구성
    │   ├── Playing.js               # 게임중 화면
    │   ├── Waiting.js               # 대기중 화면
    │   └── gameComponents
    │       ├── CardComponent.js     # 커뮤니티 카드 
    │       ├── Player.js            # 게임에 입장하는 플레이어
    │       └── TableComponent.js    # 게임 화면에서 사용하는 포커 테이블
    └── public
       └── images                    # 52장 카드 이미지 
```

## 🔍 설치 및 실행 방법

### Requirements
- [Node.js 18.17.1](https://nodejs.org/en)
- [Npm 8.19.3](https://www.npmjs.com/package/npm/v/8.19.2)

### Installation
```bash
$ git clone https://github.com/hyomin1/poker.git
$ cd poker
```
#### Frontend
```bash
$ cd poker
$ npm install 
$ npm start
```

## 💡 배운 점 및 개선사항

### 배운 점
- **실시간 통신의 중요성**: HTTP 통신만으로는 실시간 게임을 구현하는 데 한계가 있음을 경험하고, WebSocket을 통한 실시간 양방향 통신의 중요성을 체득했습니다.
- **상태 관리의 필요성**: 복잡한 게임 상태를 관리하기 위해 Zustand를 도입하여 전역 상태 관리의 효율성을 경험했습니다.
- **커스텀 훅을 통한 로직 분리**: 반복되는 비동기 로직과 WebSocket 연결 로직을 커스텀 훅으로 분리하여 코드의 재사용성과 가독성을 향상시킬 수 있었습니다.

### 개선사항
- **전역 상태 관리의 개선**: 페이지 이동이 많지 않아 초기에는 전역 상태 관리를 도입하지 않았으나, 게임 내에서 여러 컴포넌트 간 데이터 공유의 필요성을 느끼고 Zustand를 도입했습니다.
- **컴포넌트 구조 최적화**: 불필요한 컴포넌트들이 존재했고, 더 세분화가 필요한 부분도 있었습니다. 향후 프로젝트에서는 더 효율적인 컴포넌트 설계가 필요합니다.
- **테스트 코드 작성**: 복잡한 게임 로직에 대한 테스트 코드 작성이 부족했습니다. 향후 프로젝트에서는 Jest와 React Testing Library를 활용한 테스트 자동화가 필요합니다.

## 🌟 성과 

### 성과
- WebSocket을 통한 실시간 게임 구현으로 사용자 경험 향상
- React와 다양한 라이브러리를 활용한 프론트엔드 개발 역량 강화
- 복잡한 게임 로직 구현을 통한 JavaScript 실력 향상

