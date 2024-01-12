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
const PlayerName = styled.span`
  color: yellow;
  margin-right: 10px;
`;
function renderPlayer(player) {
  return (
    <React.Fragment>
      <PlayerName>{player.playerName}</PlayerName>
    </React.Fragment>
  );
}

function Player({ myPlayer, player1, player2, player3, player4, player5 }) {
  console.log("plaeyr체크", player4);
  return (
    <PlayContainer>
      {myPlayer && renderPlayer(myPlayer)}
      {player1 && renderPlayer(player1)}
      {player2 && renderPlayer(player2)}
      {player3 && renderPlayer(player3)}
      {player4 && renderPlayer(player4)}
      {player5 && renderPlayer(player5)}

      <BsEmojiSunglasses />
      <Card />
      <Card />
    </PlayContainer>
  );
}

export default Player;
