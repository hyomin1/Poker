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

function Play(props) {
  const {
    state: { boardData },
  } = useLocation();

  const onClickBtn = () => {
    client.publish({
      destination: "/pub/board/test",
      body: boardData, //JSON.stringify(boardData)
    });
  };

  return (
    <GameContainer>
      <button onClick={onClickBtn}>웹소켓 테스트 버튼</button>
      {boardData.totalPlayer >= 2 ? (
        boardData.phaseStatus === 1 || boardData.phaseStatus === "End" ? ( // Waiting일때로 수정
          <Playing boardData={boardData} />
        ) : (
          <Waiting boardData={boardData} />
        )
      ) : (
        <Waiting boardData={boardData} />
      )}
    </GameContainer>
  );
}

export default Play;
