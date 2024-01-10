import React from "react";
import { styled } from "styled-components";
import Player from "./Player";

const TableContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "playerCount player23 ."
    "player5 table player6"
    ". player14 .";

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

function TableComponent({ boardData }) {
  return (
    <TableContainer>
      <PlayerCount>{boardData.totalPlayer}/6</PlayerCount>
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
  );
}

export default TableComponent;
