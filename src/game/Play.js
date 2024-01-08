import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../client";
import { BsPersonFill } from "react-icons/bs";
import Player from "./Player";

const PlayContainer = styled.div`
  background-color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 100vw;
  height: 95%;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */

  display: grid;
  grid-template-areas:
    "playerCount player23 ."
    "player5 table player6"
    ". player14 .";
`;
const PlayerCount = styled.span`
  color: white;
  font-weight: bold;
  font-size: 24px;
  height: 5%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  grid-area: playerCount;
`;

const Table = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 80px;
  background-color: #44bd32;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  grid-area: table;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 60px;
  height: 90px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const PlayerContainer = styled.div`
  display: flex;
  ${(props) => {
    if (props.count === "14") {
      return "grid-area : player14;";
    } else if (props.count === "23") {
      return "grid-area : player23;";
    } else if (props.count === "5") {
      return "grid-area : player5;";
    } else if (props.count === "6") {
      return "grid-area : player6;";
    }
  }}
`;

function Play(props) {
  const {
    state: { boardData },
  } = useLocation();

  const [gameStart, setGameStart] = useState(false);

  // useEffect(() => {
  //   //gameStart true일때만

  //   if (gameStart) {
  //     console.log("game Start");
  //     client.activate();
  //   }

  //   return () => client.deactivate();
  // }, [gameStart]); //gameStart가 변경될때 실행

  //console.log(boardData);
  return (
    <PlayContainer>
      <TableContainer>
        <PlayerCount>{boardData.totalPlayer}/6</PlayerCount>

        <Table>
          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
        </Table>

        <PlayerContainer count="14">
          <Player />
          {boardData.totalPlayer >= 4 ? <Player /> : null}
        </PlayerContainer>
        <PlayerContainer count="23">
          {boardData.totalPlayer >= 2 ? <Player /> : null}
          {boardData.totalPlayer >= 3 ? <Player /> : null}
        </PlayerContainer>

        <PlayerContainer count="5">
          {boardData.totalPlayer >= 5 ? <Player /> : null}
        </PlayerContainer>

        <PlayerContainer count="6">
          {boardData.totalPlayer >= 6 ? <Player /> : null}
        </PlayerContainer>
      </TableContainer>
    </PlayContainer>
  );
}

export default Play;
