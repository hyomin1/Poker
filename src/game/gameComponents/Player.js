import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsEmojiSunglasses } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";
const PlayContainer = styled.div`
  display: flex;
  svg {
    width: 60px;
    height: 60px;
    color: yellow;
  }
  flex-direction: column;
`;
const Timer = styled.div`
  margin-bottom: 10px;
`;
const Card = styled.div`
  width: 80px;
  height: 120px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const PlayerInfo = styled.div`
  display: flex;
`;

const PlayerProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerName = styled.span`
  color: yellow;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;
const CardContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

function Player({ myPlayer, player1, player2, player3, player4, player5 }) {
  const players = [myPlayer, player1, player2, player3, player4, player5];
  const [time, setTime] = useState(0);
  console.log(players);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevNow) => (prevNow < 20 ? prevNow + 1 : prevNow));
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);
  const progressValue = (time / 20) * 100;

  const renderPlayer1 = (player) => {
    if (!player) {
      return null; // player가 존재하지 않으면 렌더링하지 않음
    }
    return (
      <React.Fragment key={player.id}>
        {player.status !== 0 && (
          <Timer>
            <ProgressBar now={progressValue} label={`${time}초`} animated />
          </Timer>
        )}

        <PlayerInfo>
          {player.position === 3 && <Button></Button>}
          <PlayerProfileInfo>
            <PlayerName>{player.playerName}</PlayerName>
            <BsEmojiSunglasses />
          </PlayerProfileInfo>

          {player.status !== 0 && (
            <CardContainer>
              <Card />
              <Card />
            </CardContainer>
          )}
        </PlayerInfo>
      </React.Fragment>
    );
  };
  return <PlayContainer>{players.map(renderPlayer1)}</PlayContainer>;
}

export default Player;
