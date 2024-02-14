import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";
import { BASE_URL } from "../../api";
import { client } from "../../client";
import Player from "./Player";
import { PiPokerChipBold } from "react-icons/pi";

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
  //gap: 20px; /* 열과 행 사이의 간격 조정 */
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
  position: relative;
  width: 60vw;
  height: 50vh;
  border-radius: 250px;
  background-image: linear-gradient(135deg, #6e1410 0%, #a71f17 100%);
  box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.75); /* 검정색 그림자 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  border: 15px solid #654b45;
  grid-area: table;
`;
const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
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

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 250px;
  width: 90%;
  height: 100%;
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

const Card1 = styled(motion.div)`
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card1shape !== null
      ? `url("/images/${getCardNum(props.$card1num)}_of_${getCardShape(
          props.$card1shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card2 = styled(motion.div)`
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card2shape !== null
      ? `url("/images/${getCardNum(props.$card2num)}_of_${getCardShape(
          props.$card2shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card3 = styled(motion.div)`
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card3shape !== null
      ? `url("/images/${getCardNum(props.$card3num)}_of_${getCardShape(
          props.$card3shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card4 = styled(motion.div)`
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card4shape !== null
      ? `url("/images/${getCardNum(props.$card4num)}_of_${getCardShape(
          props.$card4shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
  border-radius: 10px;
`;
const Card5 = styled(motion.div)`
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card5shape !== null
      ? `url("/images/${getCardNum(props.$card5num)}_of_${getCardShape(
          props.$card5shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
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
  font-weight: bolder;
  font-size: 24px;
  color: yellow;
`;
const PlayerInfo = styled.div``;
const ChipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #0097e6;
    width: 30px;
    height: 30px;
  }
`;
const Chip = styled.div`
  color: white;
`;

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

function TableComponent({ board, myPlayer, message, userData, userId }) {
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
  const [current, setCurrent] = useState(0);
  const [exit, setExit] = useState(false);

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

  const testStart = async () => {
    //테스트용 게임 시작
    try {
      axios.post(`${BASE_URL}/api/board/start/${board.id}`);
    } catch (error) {}
  };
  const testShowDown = async () => {
    //쇼다운 테스트
    try {
      axios.post(`${BASE_URL}/api/board/end/${board.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const testExit = async () => {
    try {
      const userResponse = window.confirm("게임에서 나가시겠습니까?");
      if (userResponse) {
        client.publish({
          destination: "/pub/board/exit",
          body: JSON.stringify(board),
          headers: {
            board_id: board.id,
          },
        });

        client.disconnectHeaders = {
          disconnect_option: "exit",
        };
        client.deactivate();
        client.onDisconnect = () => {
          window.close();
          console.log("종료");
        };
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log("나가기 에러", error);
    }
  };

  const jokBoComparison = (numbers, jokBo) => {
    // 플레이어 카드 와 족보에서 일치하는것 찾기 true/false
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

      setWinnerPlayers(winnerPlayerList);
    } else if (message === "SHOW_DOWN") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );

      const sortedHandValuePlayer = winnerPlayerList.sort(
        (a, b) => b.gameResult.handValue - a.gameResult.handValue
      ); //handValue 큰 순서대로 정렬(내림차순)

      setWinnerPlayers((prevPlayers) => [...sortedHandValuePlayer]);

      const resultArray = calculateJokBoArrays(sortedHandValuePlayer);
      setResult(resultArray);
      for (let i = 0; i < resultArray.length; i++) {
        //승자 여러명일 경우 순서대로 애니메이션 보기 위해 시간 지연
        setTimeout(() => {
          setCurrent(i);
        }, i * 2000);
      }
    }
  }, [message]);

  const test = () => {
    client.publish({
      destination: "/pub/errorTest",
      headers: { board_id: board.id },
    });
  };

  return (
    <TableContainer>
      <PlayerCount>
        {board.totalPlayer}/6
        <button onClick={testStart}>게임시작</button>
        <button onClick={testShowDown}>쇼다운</button>
        <button onClick={testExit}>나가기</button>
        <button onClick={test}>ㅌㅅㅌ</button>
      </PlayerCount>
      <AnimatePresence>
        {message === "GAME_END" &&
          winnerPlayers.length >= 1 &&
          winnerPlayers.map((player, index) => (
            <VictoryContainer
              variants={winnerVar}
              initial="start"
              animate="visible"
              key={player.userId}
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
              </VictoryMessage>
            </VictoryContainer>
          ))}
      </AnimatePresence>

      <Table>
        {board.phaseStatus >= 1 ? (
          <PotContainer
            style={{ gridColumn: "2 / span 1", gridRow: "1 / span 1" }}
          >
            <Pot>Pot : {board.pot}BB</Pot>
          </PotContainer>
        ) : null}
        {myPlayer && myPlayer.phaseCallSize !== 0 && board.phaseStatus >= 1 && (
          <ChipContainer
            style={{ gridColumn: "3 / span 1", gridRow: "3 / span 1" }}
          >
            <PiPokerChipBold />
            <Chip>{myPlayer.phaseCallSize}BB</Chip>
          </ChipContainer>
        )}

        {board.totalPlayer >= 2 &&
          playerArray[0] &&
          playerArray[0].phaseCallSize &&
          board.phaseStatus >= 1 && (
            <ChipContainer
              style={{ gridColumn: "1 / span 1", gridRow: "3 / span 1" }}
            >
              <PiPokerChipBold />
              <Chip>{playerArray[0].phaseCallSize}BB</Chip>
            </ChipContainer>
          )}
        {board.totalPlayer >= 2 &&
          playerArray[1] &&
          playerArray[1].phaseCallSize !== 0 &&
          board.phaseStatus >= 1 && (
            <ChipContainer
              style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1" }}
            >
              <PiPokerChipBold />
              <Chip>{playerArray[1].phaseCallSize}BB</Chip>
            </ChipContainer>
          )}

        {board.totalPlayer >= 2 &&
          playerArray[2] &&
          playerArray[2].phaseCallSize !== 0 &&
          board.phaseStatus >= 1 && (
            <ChipContainer
              style={{ gridColumn: "1 / span 1", gridRow: "1 / span 1" }}
            >
              <PiPokerChipBold />
              <Chip>{playerArray[2].phaseCallSize}BB</Chip>
            </ChipContainer>
          )}

        {board.totalPlayer >= 2 &&
          playerArray[3] &&
          playerArray[3].phaseCallSize !== 0 &&
          board.phaseStatus >= 1 && (
            <ChipContainer
              style={{ gridColumn: "3 / span 1", gridRow: "1 / span 1" }}
            >
              <PiPokerChipBold />
              <Chip>{playerArray[3].phaseCallSize}BB</Chip>
            </ChipContainer>
          )}
        {board.totalPlayer >= 2 &&
          playerArray[4] &&
          playerArray[4].phaseCallSize !== 0 &&
          board.phaseStatus >= 1 && (
            <ChipContainer
              style={{ gridColumn: "3 / span 1", gridRow: "2 / span 1" }}
            >
              <PiPokerChipBold />
              <Chip>{playerArray[4].phaseCallSize}BB</Chip>
            </ChipContainer>
          )}

        {board.phaseStatus >= 2 && board.phaseStatus <= 4 ? (
          <CardContainer
            style={{ gridColumn: "2 / span 1", gridRow: "2 / span 1" }}
          >
            <React.Fragment>
              <Card1
                $card1shape={board.phaseStatus >= 2 ? card1Shape : null}
                $card1num={board.phaseStatus >= 2 ? card1Num : null}
              />
              <Card2
                $card2shape={board.phaseStatus >= 2 ? card2Shape : null}
                $card2num={board.phaseStatus >= 2 ? card2Num : null}
              />
              <Card3
                $card3shape={board.phaseStatus >= 2 ? card3Shape : null}
                $card3num={board.phaseStatus >= 2 ? card3Num : null}
              />
              <Card4
                $card4shape={board.phaseStatus >= 3 ? card4Shape : null}
                $card4num={board.phaseStatus >= 3 ? card4Num : null}
              />
              <Card5
                $card5shape={board.phaseStatus === 4 ? card5Shape : null}
                $card5num={board.phaseStatus === 4 ? card5Num : null}
              />
            </React.Fragment>
          </CardContainer>
        ) : null}
        {board.phaseStatus === 6 ? (
          <AnimatePresence>
            {result.map((playerResult, index) => (
              <CardContainer
                key={index}
                style={{ gridColumn: "2 / span 1", gridRow: "2 / span 1" }}
              >
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
                userData={userData}
                userId={userId}
              />
            </PlayerInfo>
          ) : (
            <EmptyBox></EmptyBox>
          )}
          <Player
            boardData={board}
            myPlayer={myPlayer}
            message={message}
            winnerPlayers={winnerPlayers}
            userData={userData}
            userId={userId}
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
              userData={userData}
              userId={userId}
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
              userData={userData}
              userId={userId}
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
            userData={userData}
            userId={userId}
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
            userData={userData}
            userId={userId}
          />
        ) : null}
      </PlayerContainer>
    </TableContainer>
  );
}

export default TableComponent;
