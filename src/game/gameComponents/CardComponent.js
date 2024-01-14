import React from "react";
import { BsHeart } from "react-icons/bs";
import { styled } from "styled-components";

const CardContainer = styled.div`
  display: flex;
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
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.card1num)}_of_${getCardShape(
      props.card1shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card2 = styled.div`
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.card2num)}_of_${getCardShape(
      props.card2shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

const Card = styled.div`
  width: 80px;
  height: 120px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

function CardComponent({ board, player, myPlayer }) {
  //console.log("card", player.card1, player.card2, board ? board : null);

  const card1Shape = Math.floor(player.card1 / 13);
  const card2Shape = Math.floor(player.card2 / 13);
  const card1Num = player.card1 % 13;
  const card2Num = player.card2 % 13;

  return (
    <CardContainer>
      {board && myPlayer === player ? (
        <>
          <Card1 card1shape={card1Shape} card1num={card1Num} />
          <Card2 card2shape={card2Shape} card2num={card2Num} />
        </>
      ) : (
        <>
          <Card />
          <Card />
        </>
      )}
    </CardContainer>
  );
}

export default CardComponent;