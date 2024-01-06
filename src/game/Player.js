import React from "react";
import { styled } from "styled-components";
import { BsPersonFill } from "react-icons/bs";

const PlayContainer = styled.div`
  display: flex;
  svg {
    width: 50px;
    height: 50px;
  }
`;
const Card = styled.div`
  width: 60px;
  height: 90px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

function Player() {
  return (
    <PlayContainer>
      <BsPersonFill />
      <Card />
      <Card />
    </PlayContainer>
  );
}

export default Player;
