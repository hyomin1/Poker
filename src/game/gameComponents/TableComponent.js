import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";
import { BASE_URL } from "../../api";
import { client } from "../../client";
import Player from "./Player";

const TableContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "playerCount top ."
    "left table right"
    ". bottom .";

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
  flex-direction: column;
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
const isJokBo = (cardNum, jokBo) => {
  return jokBo.includes(cardNum);
};

const Card1 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card1num)}_of_${getCardShape(
      props.$card1shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card2 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card2num)}_of_${getCardShape(
      props.$card2shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card3 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card3num)}_of_${getCardShape(
      props.$card3shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card4 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card4num)}_of_${getCardShape(
      props.$card4shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card5 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card5num)}_of_${getCardShape(
      props.$card5shape
    )}.png")`};
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
    if (props.position === "bottom") {
      return "grid-area : bottom;";
    } else if (props.position === "top") {
      return "grid-area : top;";
    } else if (props.position === "left") {
      return "grid-area : left;";
    } else if (props.position === "right") {
      return "grid-area : right;";
    }
  }}
`;
const SubPlayerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const EmptyBox = styled.div``;

const PotContainer = styled.div``;

const Pot = styled.span`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;
const PlayerInfo = styled.div``;
const ChipContainer = styled.div``;
const Chip = styled(Pot);

const winnerVar = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.4,
    },
  },
};

const VictoryContainer = styled(motion.div)`
  grid-area: table;
`;
const VictoryContainer2 = styled.div`
  //grid-area: table;
  display: flex;
  flex-direction: column;
`;

const VictoryMessage = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  font-weight: bold;
  color: white;
  background-color: green;
  padding: 20px;
  border-radius: 10px;
  z-index: 999;
`;
const flash = keyframes`
  0%, 100% {
    border-color: yellow;
  }
  50% {
    border-color: transparent;
  }
`;

function TableComponent({ board, myPlayer, message }) {
  const [others, setOthers] = useState([]);
  const numOfOtherPlayers = 5;

  const card1Shape = Math.floor(board.communityCard1 / 13);
  const card2Shape = Math.floor(board.communityCard2 / 13);
  const card3Shape = Math.floor(board.communityCard3 / 13);
  const card4Shape = Math.floor(board.communityCard4 / 13);
  const card5Shape = Math.floor(board.communityCard5 / 13);
  const card1Num = board.communityCard1 % 13;
  const card2Num = board.communityCard2 % 13;
  const card3Num = board.communityCard3 % 13;
  const card4Num = board.communityCard4 % 13;
  const card5Num = board.communityCard5 % 13;

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (myPlayer) {
      const updatedOthers = Array.from(
        { length: numOfOtherPlayers },
        (_, i) => (myPlayer.position + i + 1) % 6
      );
      setOthers(updatedOthers);
    }
  }, [board.totalPlayer, myPlayer]); //postion 배치

  const playerArray = others.map((position) =>
    board.players.find((player) => player.position === position)
  );
  //console.log("다른플레이어정보", playerArray);
  const testStart = async () => {
    //테스트용 게임 시작
    try {
      const res = axios.post(`${BASE_URL}/api/board/start/${board.id}`);
    } catch (error) {}
  };
  const testShowDown = async () => {
    try {
      const res = axios.post(`${BASE_URL}/api/board/end/${board.id}`);
      console.log("showdown", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const jokBoComparison = (numbers, jokBo) => {
    return numbers.map((number) => jokBo.includes(number));
  };

  const calculateJokBoArrays = (players) => {
    return players.map((player) => {
      const communityCards = [
        board.communityCard1,
        board.communityCard2,
        board.communityCard3,
        board.communityCard4,
        board.communityCard5,
      ];
      //const playerCards = [player.card1, player.card2];
      const allNumbers = [...communityCards];
      return jokBoComparison(allNumbers, player.gameResult.jokBo);
    });
  };

  const [winnerPlayers, setWinnerPlayers] = useState([]);
  useEffect(() => {
    if (message === "GAME_END") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );
      console.log("승자", winnerPlayerList);
      setWinnerPlayers(winnerPlayerList);
    }
    if (message === "SHOW_DOWN") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );

      const sortedHandValuePlayer = winnerPlayerList.sort(
        (a, b) => b.gameResult.handValue - a.gameResult.handValue
      ); //handValue 큰 순서대로 정렬(내림차순)

      console.log("쇼다운 승자", sortedHandValuePlayer);
      setWinnerPlayers((prevPlayers) => [...sortedHandValuePlayer]);

      const resultArray = calculateJokBoArrays(sortedHandValuePlayer);
      setResult(resultArray);
      for (let i = 0; i < resultArray.length; i++) {
        setTimeout(() => {
          setCurrent(i);
        }, i * 2000);
      }
    }
  }, [message]);
  const count = [0, 1, 2, 3, 4, 5];

  const navigate = useNavigate();

  const testExit = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/board/exit`, board);
      client.deactivate();
      navigate("/login");
      console.log("나가기");
    } catch (error) {
      console.log("나가기 에러", error);
    }
  };
  const [current, setCurrent] = useState(null);

  return (
    <TableContainer>
      <PlayerCount>
        {board.totalPlayer}/6
        <button onClick={testStart}>게임시작</button>
        <button onClick={testShowDown}>쇼다운</button>
        <button onClick={testExit}>나가기</button>
      </PlayerCount>
      <AnimatePresence>
        {message === "GAME_END" &&
          winnerPlayers.length >= 1 &&
          winnerPlayers.map((player, index) => (
            <VictoryContainer
              variants={winnerVar}
              initial="start"
              animate="visible"
              key={index}
            >
              <VictoryMessage>
                {player.playerName} {player.gameResult.earnedMoney} 얻었습니다!!
              </VictoryMessage>
            </VictoryContainer>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {message === "SHOW_DOWN" &&
          winnerPlayers.length >= 1 &&
          winnerPlayers.map((player, index) => (
            <VictoryContainer
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === current ? 1 : 0 }}
              transition={{ duration: 0.5, delay: index * 2 }}
            >
              <VictoryMessage>
                {player.playerName} {player.gameResult.earnedMoney} 얻었습니다
                rank : {player.gameResult.handContext}
                {/* 얻었습니다!!!! rank : {handRank(player.handValue)} */}
              </VictoryMessage>
            </VictoryContainer>
          ))}
      </AnimatePresence>

      <Table>
        <PotContainer>
          <Pot>pot : {board.pot}</Pot>
        </PotContainer>
        {board.phaseStatus !== 0 && board.phaseStatus <= 4 ? (
          <CardContainer>
            {board.phaseStatus >= 2 ? (
              <Card1 $card1shape={card1Shape} $card1num={card1Num} />
            ) : (
              <Card />
            )}
            {board.phaseStatus >= 2 ? (
              <Card2 $card2shape={card2Shape} $card2num={card2Num} />
            ) : (
              <Card />
            )}
            {board.phaseStatus >= 2 ? (
              <Card3 $card3shape={card3Shape} $card3num={card3Num} />
            ) : (
              <Card />
            )}
            {board.phaseStatus >= 3 ? (
              <Card4 $card4shape={card4Shape} $card4num={card4Num} />
            ) : (
              <Card />
            )}
            {board.phaseStatus === 4 ? (
              <Card5 $card5shape={card5Shape} $card5num={card5Num} />
            ) : (
              <Card />
            )}
          </CardContainer>
        ) : null}
        {board.phaseStatus === 6 ? (
          <AnimatePresence>
            {result.map((playerResult, index) => (
              <CardContainer key={index}>
                {index === current ? (
                  <React.Fragment>
                    <Card1
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: playerResult[0] ? 1.3 : 1,
                        border: playerResult[0] ? "6px solid #fbc531" : "none",
                      }}
                      transition={{ duration: 0.5, delay: index * 2 }}
                      $card1shape={card1Shape}
                      $card1num={card1Num}
                    />

                    <Card2
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: playerResult[1] ? 1.3 : 1,
                        border: playerResult[1] ? "6px solid #fbc531" : "none",
                      }}
                      transition={{ duration: 0.5, delay: index * 2 }}
                      $card2shape={card2Shape}
                      $card2num={card2Num}
                    />

                    <Card3
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: playerResult[2] ? 1.3 : 1,
                        border: playerResult[2] ? "6px solid #fbc531" : "none",
                      }}
                      transition={{ duration: 0.5, delay: index * 2 }}
                      $card3shape={card3Shape}
                      $card3num={card3Num}
                    />

                    <Card4
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: playerResult[3] ? 1.3 : 1,
                        border: playerResult[3] ? "6px solid #fbc531" : "none",
                      }}
                      transition={{ duration: 0.5, delay: index * 2 }}
                      $card4shape={card4Shape}
                      $card4num={card4Num}
                    />

                    <Card5
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: playerResult[4] ? 1.3 : 1,
                        border: playerResult[4] ? "6px solid #fbc531" : "none",
                      }}
                      transition={{ duration: 0.5, delay: index * 2 }}
                      $card5shape={card5Shape}
                      $card5num={card5Num}
                    />
                  </React.Fragment>
                ) : null}
              </CardContainer>
            ))}
          </AnimatePresence>
        ) : null}
      </Table>

      <PlayerContainer position="bottom">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[0] ? (
            <PlayerInfo>
              <Player
                boardData={board}
                player1={playerArray[0]}
                message={message}
                winnerPlayers={winnerPlayers}
              />
              {/* <ChipContainer>
                <Chip>{playerArray[0].phaseCallSize}</Chip>
              </ChipContainer> */}
            </PlayerInfo>
          ) : (
            <EmptyBox></EmptyBox>
          )}
          <Player
            boardData={board}
            myPlayer={myPlayer}
            message={message}
            winnerPlayers={winnerPlayers}
          />
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="top">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[2] ? (
            <Player
              boardData={board}
              player3={playerArray[2]}
              message={message}
              winnerPlayers={winnerPlayers}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
          {board.totalPlayer >= 2 && playerArray[3] ? (
            <Player
              boardData={board}
              player4={playerArray[3]}
              message={message}
              winnerPlayers={winnerPlayers}
            />
          ) : (
            <EmptyBox></EmptyBox>
          )}
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="left">
        {board.totalPlayer >= 2 && playerArray[1] ? (
          <Player
            boardData={board}
            player2={playerArray[1]}
            message={message}
            winnerPlayers={winnerPlayers}
          />
        ) : null}
      </PlayerContainer>

      <PlayerContainer position="right">
        {board.totalPlayer >= 2 && playerArray[4] ? (
          <Player
            boardData={board}
            player5={playerArray[4]}
            message={message}
            winnerPlayers={winnerPlayers}
          />
        ) : null}
      </PlayerContainer>
    </TableContainer>
  );
}

export default TableComponent;
