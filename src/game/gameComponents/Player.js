import React from "react";
import { styled } from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BsEmojiSunglasses } from "react-icons/bs";
const PlayContainer = styled.div`
  display: flex;
  svg {
    width: 60px;
    height: 60px;
    color: yellow;
  }
`;
const Card = styled.div`
  width: 80px;
  height: 120px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

function Player() {
  return (
    <PlayContainer>
      <BsEmojiSunglasses />
      <Card />
      <Card />
    </PlayContainer>
  );
}

export default Player;
