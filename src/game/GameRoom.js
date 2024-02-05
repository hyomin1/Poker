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
  const receivedData = JSON.parse(window.name);

  const { boardData, userData, userId } = receivedData;

  const [message, setMessage] = useState("");

  const [board, setBoard] = useState(boardData);

  const userIdInt = parseInt(userId, 10); //userId String값이어서 Int형으로 형변환

  const [myPlayer, setMyPlayer] = useState(null);

  useEffect(() => {
    const updatedMyPlayer = board.players.find(
      (player) => player.userId === userIdInt
    );
    setMyPlayer(updatedMyPlayer);
  }, [board, userIdInt]);

  const handleGameStart = (message) => {
    //웹소켓 콜백함수 정의
    const webSocketBoard = JSON.parse(message.body); //웹소켓에서 오는 데이터 파싱

    setMessage(webSocketBoard.messageType); // GAME_START, PLAYER_JOIN... 저장
    setBoard(webSocketBoard.data); //갱신되는 boardData 저장
    console.log("web", webSocketBoard.messageType, webSocketBoard.data);
  };
  console.log("확인", board);
  useEffect(() => {
    setBoard(boardData);
    client.connectHeaders = {
      userId: userData.userId,
      password: userData.password,
    };
    client.activate();
    client.onConnect = function (frame) {
      console.log("웹소켓 연결완료2");
      client.subscribe(`/topic/board/${boardData.id}`, handleGameStart);
      //client.subscribe(`/queue/${userId}`, function (message) {});
      client.subscribe(
        `/queue/error/${boardData.id}/${userId}`,
        function (message) {
          console.log("queue/error 에러", message);
        }
      );
    };

    const updatedBoard = async () => {
      //새로고침시 최신 board 받아오는 것 필요
      try {
        const res = await axios.get(`${BASE_URL}/api/board/${board.id}`);
        console.log("새로고침", res.data);
        setBoard(res.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
        alert(error.response.data.message);
        console.log("새로고침시 최신 보드 받기 에러", error);
      }
    };

    updatedBoard();
  }, []);

  return (
    <GameContainer>
      {board && board.phaseStatus === 0 ? (
        <Waiting
          myPlayer={myPlayer}
          board={board}
          message={message}
          userData={userData}
          userId={userId}
        />
      ) : (
        <Playing
          myPlayer={myPlayer}
          setBoard={setBoard}
          board={board}
          client={client}
          message={message}
          userData={userData}
          userId={userId}
        />
      )}
    </GameContainer>
  );
}

export default GameRoom;
