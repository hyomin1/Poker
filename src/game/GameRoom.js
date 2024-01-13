import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
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

  const [board, setBoard] = useState(boardData);

  const onClickBtn = () => {
    client.publish({
      destination: "/pub/board/test",
      body: boardData, //JSON.stringify(boardData)
    });
  };
  const userIdInt = parseInt(userId, 10); //userId String값이어서 Int형으로 형변환
  const myPlayer = board.players.find((player) => player.userId === userIdInt);
  //console.log("내 정보", myPlayer);

  const handleGameStart = (message) => {
    //웹소켓 콜백함수 정의
    const webSocketBoard = JSON.parse(message.body); //웹소켓에서 오는 데이터 파싱

    setGameStart(webSocketBoard.messageType); // GAME_START 저장
    setBoard(webSocketBoard.data);
    console.log("web", webSocketBoard.data);
    if (webSocketBoard.messageType === "PLAYER_JOIN") {
      alert("플레이어가 입장하였습니다.");
    }
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

    // const updatedBoard = async () => { //새로고침시 최신 board 받아오는 것 필요
    //   try {
    //     const bb = myPlayer.bb;
    //     const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
    //       params: {
    //         bb,
    //       },
    //     });
    //     console.log("새로고침", res.data);
    //     setBoard(res.data);
    //   } catch (error) {
    //     console.log("새로고침시 최신 보드 받기 에러", error);
    //   }
    // };

    // updatedBoard();

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
      {gameStart === "GAME_START" || boardData.phaseStatus === 1 ? (
        <Playing myPlayer={myPlayer} board={board} />
      ) : (
        <Waiting myPlayer={myPlayer} board={board} />
      )}
    </GameContainer>
  );
}

export default GameRoom;
