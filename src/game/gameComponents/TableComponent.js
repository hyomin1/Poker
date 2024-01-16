import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BASE_URL } from "../../api";
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
const getCardShape = (shape) => {
  switch (shape) {
    case 0:
      return "spades";
    case 1:
      return "diamonds";
    case 2:
      return "hearts";
    case 3:
      return "clubs";
    default:
      return "";
  }
};
const getCardNum = (num) => {
  if (num >= 0 && num <= 8) {
    return num + 2;
  } else {
    switch (num) {
      case 9:
        return "jack";
      case 10:
        return "queen";
      case 11:
        return "king";
      case 12:
        return "ace";
      default:
        return "";
    }
  }
};

const Card1 = styled.div`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card1num)}_of_${getCardShape(
      props.$card1shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card2 = styled.div`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card2num)}_of_${getCardShape(
      props.$card2shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card3 = styled.div`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card3num)}_of_${getCardShape(
      props.$card3shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card4 = styled.div``;
const Card5 = styled.div``;
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

function TableComponent({ board, myPlayer, message }) {
  const [others, setOthers] = useState([]);
  const numOfOtherPlayers = 5;

  const card1Shape = Math.floor(board.communityCard1 / 13);
  const card2Shape = Math.floor(board.communityCard2 / 13);
  const card3Shape = Math.floor(board.communityCard3 / 13);
  const card4Shape = Math.floor(board.communityCard4 / 13);
  const card5Shape = Math.floor(board.communityCard5 / 13);
  const card1Num = board.communityCard1 % 13;
  const card2Num = board.communityCard2 % 13;
  const card3Num = board.communityCard3 % 13;
  const card4Num = board.communityCard4 % 13;
  const card5Num = board.communityCard5 % 13;

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
  const testStart = async () => {
    //테스트용 게임 시작
    try {
      const res = axios.post(`${BASE_URL}/api/board/start/${board.id}`);
    } catch (error) {}
  };

  return (
    <TableContainer>
      <PlayerCount>
        {board.totalPlayer}/6
        <button onClick={testStart}>게임시작</button>
      </PlayerCount>

      <Table>
        <CardContainer>
          {message === "NEXT_PHASE_START" ? (
            <Card1 $card1shape={card1Shape} $card1num={card1Num} />
          ) : (
            <Card />
          )}
          {message === "NEXT_PHASE_START" ? (
            <Card2 $card2shape={card2Shape} $card2num={card2Num} />
          ) : (
            <Card />
          )}
          {message === "NEXT_PHASE_START" ? (
            <Card3 $card3shape={card3Shape} $card3num={card3Num} />
          ) : (
            <Card />
          )}
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
