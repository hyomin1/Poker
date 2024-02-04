import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { styled } from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
const BoardInform = styled.div`
  width: 400px;
  height: 200px;
  background-color: green;
`;
const NoBoard = styled.div`
  width: 400px;
  height: 200px;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function GameRoomList({ blind1000, blind2000, blind4000, blind10000 }) {
  const renderCarousel = (blindData, unique) => (
    <Carousel key={unique}>
      {blindData.map((board, index) => (
        <Carousel.Item key={index} interval={10000}>
          <BoardInform className="d-block w-100" />
          <Carousel.Caption>
            <h3>NO. {board.id}</h3>
            <p>{board.totalPlayer}/6</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return (
    <Grid>
      {blind1000.length >= 1 ? (
        renderCarousel(blind1000, "blind1000")
      ) : (
        <NoBoard>방이 없습니다</NoBoard>
      )}
      {blind2000.length >= 1 ? (
        renderCarousel(blind2000, "blind2000")
      ) : (
        <NoBoard>방이 없습니다</NoBoard>
      )}
      {blind4000.length >= 1 ? (
        renderCarousel(blind4000, "blind4000")
      ) : (
        <NoBoard>방이 없습니다</NoBoard>
      )}
      {blind10000.length >= 1 ? (
        renderCarousel(blind10000, "blind10000")
      ) : (
        <NoBoard>방이 없습니다</NoBoard>
      )}
    </Grid>
  );
}

export default GameRoomList;
