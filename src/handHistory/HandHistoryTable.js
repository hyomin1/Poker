import React from "react";
import { styled } from "styled-components";
const Container = styled.div`
  height: 65%;
  display: grid;
  grid-template-areas:
    ". top ."
    "left table right"
    ". bottom .";
  grid-template-columns: repeat(3, 1fr); /* 3개의 열로 나누어 간격 조정 */
  grid-template-rows: repeat(3, 1fr); /* 3개의 행으로 나누어 간격 조정 */
  //gap: 0px; /* 열과 행 사이의 간격 조정 */
  background-color: #2c3e50;
  border: 1px green solid;
`;
const Table = styled.div`
  background-color: green;
  width: 100%;
  height: 100%;
  border-radius: 200px;
  border: 30px solid brown;
  display: flex;
  justify-content: space-around;
  align-items: center;
  grid-area: table;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  width: 90px;
  height: 120px;
  border: 1px solid black;
  margin: 0px 10px;
`;
const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${(props) => {
    if (props.position === "top") {
      return "grid-area:top;";
    } else if (props.position === "bottom") {
      return "grid-area:bottom;";
    } else if (props.position === "left") {
      return "grid-area:left;";
    } else if (props.position === "right") {
      return "grid-area:right;";
    }
  }}
`;
const Player = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
`;

function HandHistoryTable() {
  return (
    <Container>
      <Table>
        <CardContainer>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardContainer>
      </Table>
      <PlayerContainer position="top">
        <Player />
        <Player />
      </PlayerContainer>
      <PlayerContainer position="bottom">
        <Player />
        <Player />
      </PlayerContainer>
      <PlayerContainer position="left">
        <Player />
      </PlayerContainer>
      <PlayerContainer position="right">
        <Player />
      </PlayerContainer>
    </Container>
  );
}

export default HandHistoryTable;
