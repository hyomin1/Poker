import React from "react";
import { styled } from "styled-components";
const Container = styled.div`
  height: 50%;
  display: grid;
  grid-template-areas:
    ". top ."
    "left table right"
    ". bottom .";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: linear-gradient(135deg, #1b1516 0%, #2f2627 100%);
`;
const Table = styled.div`
  background-color: #265f35;
  width: 800px;
  height: 350px;
  border-radius: 175px;
  border: 30px solid transparent;
  box-shadow: 0 0 0 30px #906650, 0 0 0 35px #c4a487; /* 둥근 테두리 그라데이션 적용 */
  display: flex;
  justify-content: space-around;
  align-items: center;
  grid-area: table;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 175px;
  width: 100%;
  height: 100%;
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
  width: 100px;
  height: 100px;
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
