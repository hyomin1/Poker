import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsEmojiSunglasses } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";
import CardComponent from "./CardComponent";
import { client } from "../../client";
import axios from "axios";
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
const PlayContainer = styled.div`
  display: flex;
  svg {
    width: 60px;
    height: 60px;
    color: yellow;
  }

  z-index: 2;
`;
const Timer = styled.div`
  margin-bottom: 10px;
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const PlayerProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BettingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  flex-direction: ${(props) => (props.$batch === "raise" ? "column" : "row")};
`;
const AddInformBetting = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const AmountWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #353b48;
  border: 1px solid black;
`;
const Amount = styled.span`
  color: #e1b12c;
  font-weight: bold;
  font-size: 24px;
  width: 90%;
  height: 50%;
  text-align: center;
`;
const PercentWrapper = styled(AmountWrapper)`
  width: 45%;
`;

const QuarterBtn = styled.button`
  background-color: ${(props) => (props.$quarter ? "#718093" : "#353b48")};
  color: ${(props) => (props.$quarter ? "black" : "white")};
  font-weight: bold;
  font-size: 18px;
  width: 33%;
  height: 80%;
`;
const HalfBtn = styled(QuarterBtn)`
  background-color: ${(props) => (props.$half ? "#718093" : "#353b48")};
  color: ${(props) => (props.$half ? "black" : "white")};
`;
const FullBtn = styled(QuarterBtn)`
  background-color: ${(props) => (props.$full ? "#718093" : "#353b48")};
  color: ${(props) => (props.$full ? "black" : "white")};
`;

const BettingButton = styled.button`
  background-color: #353b48;
  color: white;
  width: 190px;
  height: 45px;
  font-weight: bold;
  font-size: 20px;
  ${(props) => {
    if (props.status === "fold") {
      return "color : #f5f6fa;";
    } else if (props.status === "check") {
      return "color : #4cd137;";
    } else if (props.status === "raise") {
      return "color :#fbc531; ";
    } else if (props.status === "call") {
      return "color :#00a8ff;";
    } else if (props.status === "allin") {
      return "color:#e84118;";
    }
  }}
`;
const RaiseContainer = styled.div`
  display: flex;
`;
const RaiseInputContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #353b48;
  height: 100%;
  justify-content: center;
  border: 1px solid black;
`;
const PlayerImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px 10px;
  border-radius: 10px;
`;
const PlayerName = styled.span`
  color: gray;
  font-weight: bold;
  font-size: 24px;
`;
const Chip = styled.span`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;
const Time = styled.div`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

function Player({
  myPlayer,
  player1,
  player2,
  player3,
  player4,
  player5,
  boardData,
  message,
  winnerPlayers,
  userData,
  userId,
}) {
  const players = [myPlayer, player1, player2, player3, player4, player5];

  const [board, setBoard] = useState(boardData);
  const [amount, setAmount] = useState(board.blind);

  const [isQuarter, setIsQuarter] = useState(false);
  const [isHalf, setIsHalf] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [exit, setExit] = useState(false);

  const actionTime = 1000;

  const remainTimeView = Math.floor(
    new Date(board.lastActionTime).getTime() / 1000 +
      actionTime -
      currentTime.getTime() / 1000
  );

  const progressValue = (remainTimeView / actionTime) * 100;

  useEffect(() => {
    setBoard(boardData);
    if (boardData.bettingSize === 0) {
      setAmount(boardData.blind);
    } else {
      setAmount(boardData.bettingSize * 2);
    }
  }, [boardData]); //최신 보드 데이터 저장

  const publishBoardAction = (updatedBoard, playerId, option) => {
    //websokcet 통신 함수
    client.publish({
      destination: `/pub/board/action/${option}`,
      body: JSON.stringify(updatedBoard),
      headers: {
        PlayerId: playerId,
        board_id: board.id,
      },
    });
  };
  const updateBoard = (update, playerId, option) => {
    //board 업데이트 함수
    setBoard((prev) => {
      const updatedBoard = update(prev);
      publishBoardAction(updatedBoard, playerId, option);
      return updatedBoard;
    });
  };

  const call = (bettingSize, phaseCallSize, money, player) => {
    if (bettingSize - phaseCallSize <= money) {
      updateBoard(
        (prev) => {
          const updatedPlayers = prev.players.map((play) =>
            player && play.id === player.id
              ? {
                  ...play,
                  money: money - (bettingSize - phaseCallSize),
                  phaseCallSize: bettingSize,
                }
              : play
          );
          return {
            ...prev,
            players: updatedPlayers,
          };
        },
        player.id,
        "call"
      );
    }
  };
  const fold = (bettingSize, player) => {
    if (bettingSize !== 0) {
      updateBoard(
        (prev) => {
          const updatedPlayers = prev.players.map((play) =>
            player && play.id === player.id
              ? {
                  ...play,
                  status: 3,
                }
              : play
          );
          return {
            ...prev,
            players: updatedPlayers,
          };
        },
        player.id,
        "fold"
      );
    }
  };
  const check = (bettingSize, phaseCallSize, player) => {
    if (bettingSize === phaseCallSize) {
      publishBoardAction(board, player.id, "check");
    }
  };
  const raise = (money, phaseCallSize, bettingSize, player) => {
    const calculatePhaseCallSize = (percentage) => {
      const sum = board.players.reduce(
        (acc, player) => acc + player.phaseCallSize,
        0
      );
      const calculatedSize =
        bettingSize + (board.pot + sum - phaseCallSize) * percentage;
      return calculatedSize;
    };
    if (isQuarter) {
      //25%레이즈
      const myPhaseCallSize = calculatePhaseCallSize(0.25);
      if (player.money < myPhaseCallSize) {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: player.money,
                    status: 3,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: player.money,
            };
          },
          player.id,
          "raise"
        );
      } else {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: myPhaseCallSize,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: myPhaseCallSize,
            };
          },
          player.id,
          "raise"
        );
      }
    } else if (isHalf) {
      //50%레이즈
      const myPhaseCallSize = calculatePhaseCallSize(0.5);
      if (player.money < myPhaseCallSize) {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: player.money,
                    status: 3,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: player.money,
            };
          },
          player.id,
          "raise"
        );
      } else {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: myPhaseCallSize,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: myPhaseCallSize,
            };
          },
          player.id,
          "raise"
        );
      }
    } else if (isFull) {
      //100% 레이즈

      const myPhaseCallSize = calculatePhaseCallSize(1);

      if (player.money < myPhaseCallSize) {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: player.money,
                    status: 3,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: player.money,
            };
          },
          player.id,
          "raise"
        );
      } else {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              play.id === player.id
                ? {
                    ...play,
                    phaseCallSize: myPhaseCallSize,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: myPhaseCallSize,
            };
          },
          player.id,
          "raise"
        );
      }
    } else {
      //일반 레이즈
      if (money - phaseCallSize > bettingSize * 2) {
        updateBoard(
          (prev) => {
            const updatedPlayers = prev.players.map((play) =>
              player && play.id === player.id
                ? {
                    ...play,
                    status:
                      amount === player.money + player.phaseCallSize
                        ? 4
                        : play.status,
                    money: play.money - (amount - phaseCallSize),
                    phaseCallSize: amount,
                  }
                : play
            );
            return {
              ...prev,
              players: updatedPlayers,
              bettingPos: player.position,
              bettingSize: amount,
            };
          },
          player.id,
          amount === money + phaseCallSize ? "allInRaise" : "raise",
          money
        );
      }
    }
    //레이즈 후 상태 초기화
    setIsQuarter(false);
    setIsHalf(false);
    setIsFull(false);
  };

  const allIn = (bettingSize, phaseCallSize, money, player) => {
    if (bettingSize - phaseCallSize >= money) {
      updateBoard(
        (prev) => {
          const updatedPlayers = prev.players.map((play) =>
            player && play.id === player.id
              ? {
                  ...play,
                  status: 4,
                  money: play.money - play.money,
                  phaseCallSize: money + phaseCallSize,
                }
              : play
          );
          return {
            ...prev,
            players: updatedPlayers,
          };
        },
        player.id,
        "allInCall"
      );
    }
  };
  const onHandleAmount = (e) => {
    setAmount(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const timeOut = async (player) => {
    updateBoard(
      (prev) => {
        const updatedPlayers = prev.players.map((play) =>
          play.id === player.id
            ? {
                ...play,
                status: 3,
              }
            : play
        );
        return {
          ...prev,
          players: updatedPlayers,
        };
      },
      player.id,
      "fold"
    );
    setTimeout(() => {
      client.publish({
        destination: "/pub/board/exit",
        body: JSON.stringify(board),
        headers: {
          PlayerId: player.id,
          board_id: board.id,
        },
      });

      client.disconnectHeaders = {
        disconnect_option: "exit",
      };
      client.deactivate();
      client.onDisconnect = () => {
        window.close();
      };
    }, 1000);
  };
  useEffect(() => {
    if (exit) {
      client.deactivate();
      window.close();
    }
  }, [message]);

  const quarterClick = () => {
    setIsQuarter((prev) => !prev);
    setIsHalf(false);
    setIsFull(false);
  };
  const halfClick = () => {
    setIsHalf((prev) => !prev);
    setIsQuarter(false);
    setIsFull(false);
  };
  const fullClick = () => {
    setIsFull((prev) => !prev);
    setIsHalf(false);
    setIsQuarter(false);
  };
  const viewOtherHud = async (userId) => {
    const goHud = window.open("/hud", "_blank", "width=500,height=300");
    const res = await axios.get(`${BASE_URL}/api/hud/${userId}`);
    const sendData = {
      hudData: res.data,
    };
    goHud.name = JSON.stringify(sendData);

    console.log(res.data);
  };
  const viewMyHud = (userId) => {};
  //console.log(userId);

  const bettingMethod = (
    bettingSize,
    phaseCallSize,
    money,
    player,
    phaseStatus
  ) => {
    if (
      phaseStatus >= 1 &&
      phaseStatus <= 4 &&
      remainTimeView < 0 &&
      isTimeOut
    ) {
      setIsTimeOut((prev) => !prev);
      console.log("타임 아웃", remainTimeView);
      timeOut(player);
    }

    if (phaseStatus !== 0 && bettingSize === phaseCallSize) {
      return (
        <>
          {phaseStatus >= 1 && phaseStatus <= 4 ? (
            <BettingButtonContainer $batch="raise">
              <AddInformBetting>
                <PercentWrapper>
                  <QuarterBtn
                    $quarter={isQuarter ? true : false}
                    onClick={quarterClick}
                  >
                    25%
                  </QuarterBtn>
                  <HalfBtn $half={isHalf ? true : false} onClick={halfClick}>
                    50%
                  </HalfBtn>
                  <FullBtn $full={isFull ? true : false} onClick={fullClick}>
                    100%
                  </FullBtn>
                </PercentWrapper>
                <AmountWrapper>
                  <Amount>{amount}</Amount>
                </AmountWrapper>
                <RaiseInputContainer>
                  <input
                    onChange={onHandleAmount}
                    min={
                      board.bettingSize === 0
                        ? board.blind
                        : board.bettingSize * 2
                    }
                    max={player.money + player.phaseCallSize}
                    value={amount}
                    type="range"
                    step={100}
                    style={{
                      width: "80%",
                      height: "20px",
                      cursor: "pointer",
                      appearance: "none",
                      borderRadius: "5px",
                      outline: "none",
                    }}
                  />
                </RaiseInputContainer>
              </AddInformBetting>
              <RaiseContainer>
                <BettingButton
                  status="check"
                  onClick={() => check(bettingSize, phaseCallSize, player)}
                >
                  체크
                </BettingButton>

                <BettingButton
                  status={amount === player.money ? "allin" : "raise"}
                  onClick={() =>
                    raise(money, phaseCallSize, bettingSize, player)
                  }
                >
                  {amount === player.money ? "올인" : "레이즈"}
                </BettingButton>
              </RaiseContainer>
            </BettingButtonContainer>
          ) : null}
        </>
      );
    } else if (
      phaseStatus !== 0 &&
      phaseCallSize < bettingSize &&
      money <= bettingSize - phaseCallSize
    ) {
      return (
        <>
          {phaseStatus >= 1 && phaseStatus <= 4 ? (
            <BettingButtonContainer>
              <BettingButton
                status="fold"
                onClick={() => fold(bettingSize, player)}
              >
                폴드
              </BettingButton>
              <BettingButton
                status="allin"
                onClick={() => allIn(bettingSize, phaseCallSize, money, player)}
              >
                올인
              </BettingButton>
            </BettingButtonContainer>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          {phaseStatus !== 0 && phaseStatus >= 1 && phaseStatus <= 4 ? (
            <BettingButtonContainer $batch="raise">
              <AddInformBetting>
                <PercentWrapper>
                  <QuarterBtn
                    $quarter={isQuarter ? true : false}
                    onClick={quarterClick}
                  >
                    25%
                  </QuarterBtn>
                  <HalfBtn $half={isHalf ? true : false} onClick={halfClick}>
                    50%
                  </HalfBtn>
                  <FullBtn $full={isFull ? true : false} onClick={fullClick}>
                    100%
                  </FullBtn>
                </PercentWrapper>
                <AmountWrapper>
                  <Amount>{amount}</Amount>
                </AmountWrapper>
                <RaiseInputContainer>
                  <input
                    onChange={onHandleAmount}
                    min={
                      board.bettingSize === 0
                        ? board.blind
                        : board.bettingSize * 2
                    }
                    max={player.money + player.phaseCallSize}
                    value={amount}
                    type="range"
                    step={100}
                    style={{
                      width: "80%",
                      height: "20px",
                      cursor: "pointer",
                      appearance: "none",
                      borderRadius: "5px",
                      outline: "none",
                    }}
                  />
                </RaiseInputContainer>
              </AddInformBetting>
              <RaiseContainer>
                <BettingButton
                  status="fold"
                  onClick={() => fold(bettingSize, player)}
                >
                  폴드
                </BettingButton>
                <BettingButton
                  status="call"
                  onClick={() =>
                    call(bettingSize, phaseCallSize, money, player)
                  }
                >
                  콜
                </BettingButton>

                <BettingButton
                  status="raise"
                  onClick={() =>
                    raise(money, phaseCallSize, bettingSize, player)
                  }
                >
                  {amount === player.money + player.phaseCallSize
                    ? "올인"
                    : "레이즈"}
                </BettingButton>
              </RaiseContainer>
            </BettingButtonContainer>
          ) : null}
        </>
      );
    }
  };

  const renderPlayer1 = (player) => {
    if (!player) {
      return null; // player가 존재하지 않으면 렌더링하지 않음
    }

    return (
      <React.Fragment key={player.id}>
        {/* {board &&
          board.actionPos === player.position &&
          board.phaseStatus >= 1 &&
          board.phaseStatus <= 4 && (
            <>
              <Timer>
                <ProgressBar
                  variant="danger"
                  now={progressValue}
                  label={`${remainTimeView}초`}
                  animated
                />
              </Timer>
            </>
          )} */}

        <PlayerInfo>
          <PlayerProfileInfo>
            {board &&
              board.actionPos === player.position &&
              board.phaseStatus >= 1 &&
              board.phaseStatus <= 4 && (
                <CircularProgressbarWithChildren
                  value={100 - progressValue}
                  styles={{
                    root: { height: "50px" },
                    path: {
                      stroke: "red",
                      strokeLinecap: "butt",
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      strokeWidth: "10px",
                    },

                    trail: {
                      stroke: "#d7d7d7",
                    },
                  }}
                >
                  <Time>{remainTimeView}초</Time>
                </CircularProgressbarWithChildren>
              )}
          </PlayerProfileInfo>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <PlayerImg onClick={() => viewOtherHud(player.userId)}>
                사진
              </PlayerImg>
              <div style={{ display: "flex" }}>
                <ChipContainer>
                  <PlayerName>{player.playerName}</PlayerName>
                  <Chip>{(player.money / board.blind).toFixed(1)}BB</Chip>
                </ChipContainer>
              </div>
            </div>

            <CardComponent
              board={boardData}
              player={player}
              myPlayer={myPlayer}
              message={message}
              winnerPlayers={winnerPlayers}
            />
          </div>
        </PlayerInfo>
        {board &&
          board.actionPos === player.position &&
          myPlayer === player &&
          bettingMethod(
            board.bettingSize,
            player.phaseCallSize,
            player.money,
            player,
            board.phaseStatus,
            board.lastActionTime
          )}
      </React.Fragment>
    );
  };
  return <PlayContainer>{players.map(renderPlayer1)}</PlayContainer>;
}

export default Player;
