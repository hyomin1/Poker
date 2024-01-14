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

function TableComponent({ board, myPlayer, setBoard, client }) {
  const [others, setOthers] = useState([]);
  const numOfOtherPlayers = 5;

  useEffect(() => {
    const updatedOthers = Array.from(
      { length: numOfOtherPlayers },
      (_, i) => (myPlayer.position + i + 1) % 6
    );
    setOthers(updatedOthers);
  }, [board.totalPlayer, myPlayer.position]); //postion 배치

  const playerArray = others.map((position) =>
    board.players.find((player) => player.position === position)
  );
  //console.log("다른플레이어정보", playerArray);

  return (
    <TableContainer>
      <PlayerCount>{board.totalPlayer}/6</PlayerCount>
      {/* <button onClick={onClickBtn}>test</button> */}

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
              setBoard={setBoard}
              boardData={board}
              player1={playerArray[0]}
              cleint={client}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
          <Player
            setBoard={setBoard}
            boardData={board}
            myPlayer={myPlayer}
            client={client}
          />
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="top">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[2] ? (
            <Player
              setBoard={setBoard}
              boardData={board}
              player3={playerArray[2]}
              cleint={client}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
          {board.totalPlayer >= 2 && playerArray[3] ? (
            <Player
              setBoard={setBoard}
              boardData={board}
              player4={playerArray[3]}
              cleint={client}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="left">
        {board.totalPlayer >= 2 && playerArray[1] ? (
          <Player
            setBoard={setBoard}
            boardData={board}
            player2={playerArray[1]}
            cleint={client}
          />
        ) : null}
      </PlayerContainer>

      <PlayerContainer position="right">
        {board.totalPlayer >= 2 && playerArray[4] ? (
          <Player
            setBoard={setBoard}
            boardData={board}
            player5={playerArray[4]}
            cleint={client}
          />
        ) : null}
      </PlayerContainer>
    </TableContainer>
  );
}

export default TableComponent;
