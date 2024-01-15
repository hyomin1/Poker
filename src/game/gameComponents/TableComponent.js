import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Player from "./Player";

const TableContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "playerCount top ."
    "left table right"
    ". bottom .";

  grid-template-columns: repeat(3, 1fr); /* 3개의 열로 나누어 간격 조정 */
  grid-template-rows: repeat(3, 1fr); /* 3개의 행으로 나누어 간격 조정 */
  gap: 20px; /* 열과 행 사이의 간격 조정 */
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
  border-radius: 160px;
  background-color: #c23616;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px solid black;
  grid-area: table;
  padding: 150px 200px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  width: 100px;
  height: 150px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const PlayerContainer = styled.div`
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${(props) => {
    if (props.position === "bottom") {
      return "grid-area : bottom;";
    } else if (props.position === "top") {
      return "grid-area : top;";
    } else if (props.position === "left") {
      return "grid-area : left;";
    } else if (props.position === "right") {
      return "grid-area : right;";
    }
  }}
`;
const SubPlayerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const EmptyBox = styled.div``;

function TableComponent({ board, myPlayer, client, message }) {
  const [others, setOthers] = useState([]);
  const numOfOtherPlayers = 5;

  useEffect(() => {
    if (myPlayer) {
      const updatedOthers = Array.from(
        { length: numOfOtherPlayers },
        (_, i) => (myPlayer.position + i + 1) % 6
      );
      setOthers(updatedOthers);
    }
  }, [board.totalPlayer, myPlayer]); //postion 배치

  const playerArray = others.map((position) =>
    board.players.find((player) => player.position === position)
  );
  //console.log("다른플레이어정보", playerArray);

  return (
    <TableContainer>
      <PlayerCount>{board.totalPlayer}/6</PlayerCount>

      <Table>
        <CardContainer>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardContainer>
      </Table>

      <PlayerContainer position="bottom">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[0] ? (
            <Player
              boardData={board}
              player1={playerArray[0]}
              message={message}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
          <Player boardData={board} myPlayer={myPlayer} message={message} />
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="top">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[2] ? (
            <Player
              boardData={board}
              player3={playerArray[2]}
              message={message}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
          {board.totalPlayer >= 2 && playerArray[3] ? (
            <Player
              boardData={board}
              player4={playerArray[3]}
              message={message}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="left">
        {board.totalPlayer >= 2 && playerArray[1] ? (
          <Player
            boardData={board}
            player2={playerArray[1]}
            message={message}
          />
        ) : null}
      </PlayerContainer>

      <PlayerContainer position="right">
        {board.totalPlayer >= 2 && playerArray[4] ? (
          <Player
            boardData={board}
            player5={playerArray[4]}
            message={message}
          />
        ) : null}
      </PlayerContainer>
    </TableContainer>
  );
}

export default TableComponent;
