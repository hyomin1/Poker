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
  width: 50vw;
  height: 40vh;
  border-radius: 250px;
  background-image: linear-gradient(135deg, #6e1410 0%, #a71f17 100%);
  box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.75);
  border: 15px solid #654b45;
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
  width: 90%;
  height: 70%;
`;

const Card = styled.div`
  width: 100px;
  height: 150px;
  border: 1px solid yellow;
  margin: 0px 10px;
  border-radius: 10px;
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
