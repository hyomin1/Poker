import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../client";
import Playing from "./Playing";
import Waiting from "./Waiting";

const GameContainer = styled.div`
  background-image: url("/images/gameBack.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function GameRoom() {
  const {
    state: { boardData, userData, userId },
  } = useLocation();

  const [gameStart, setGameStart] = useState("");

  const onClickBtn = () => {
    client.publish({
      destination: "/pub/board/test",
      body: boardData, //JSON.stringify(boardData)
    });
  };
  const userIdInt = parseInt(userId, 10); //userId String값이어서 Int형으로 형변환
  const myPlayer = boardData.players.find(
    (player) => player.userId === userIdInt
  );
  console.log("내 정보", myPlayer);

  const handleGameStart = (message) => {
    console.log("콜백 메시지", message);
    //웹소켓 콜백함수 정의
    const gameStart = JSON.parse(message.body); //웹소켓에서 오는 데이터 파싱
    setGameStart(gameStart.messageType); // GAME_START 저장
  };

  useEffect(() => {
    //let sub1, sub2;
    if (client && client.connected) {
      client.subscribe(`/topic/board/${boardData.id}`, handleGameStart);
    } else {
      //새로 고침 시 재연결 로직, setTimeout말고 다른 방법 없나?
      client.connectHeaders = {
        userId: userData.userId,
        password: userData.password,
      };
      client.activate();
      setTimeout(() => {
        client.subscribe(`/topic/${boardData.id}`, function (message) {});
        client.subscribe(`/topic/board/${boardData.id}`, handleGameStart);
      }, 100);
    }

    // return () => {
    //   if (sub1) {
    //     sub1.unsubscribe();
    //   }
    //   if (sub2) {
    //     sub2.unsubscribe();
    //   }
    // };
  }, []);

  return (
    <GameContainer>
      {/* <button onClick={onClickBtn}>웹소켓 테스트 버튼</button> */}
      {gameStart === "GAME_START" ? (
        <Playing myPlayer={myPlayer} boardData={boardData} />
      ) : (
        <Waiting myPlayer={myPlayer} boardData={boardData} />
      )}
    </GameContainer>
  );
}

export default GameRoom;
