import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsEmojiSunglasses } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";
import CardComponent from "./CardComponent";
import { client } from "../../client";
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

function Player({
  myPlayer,
  player1,
  player2,
  player3,
  player4,
  player5,
  boardData,
  message,
}) {
  const players = [myPlayer, player1, player2, player3, player4, player5];
  const [time, setTime] = useState(0);
  const [isBet, setIsBet] = useState(false);
  const [isRaise, setIsRaise] = useState(false);
  const [board, setBoard] = useState(boardData);
  const [amount, setAmount] = useState(board.blind);

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
  console.log("message", message);

  const publishBoardAction = (updatedBoard, playerId) => {
    //websokcet 통신 함수
    client.publish({
      destination: "/pub/board/action",
      body: JSON.stringify(updatedBoard),
      headers: { PlayerId: playerId },
    });
  };
  const updateBoard = (update) => {
    //board 업데이트 함수
    setBoard((prev) => {
      const updatedBoard = update(prev);
      publishBoardAction(updatedBoard, myPlayer.id);
      return updatedBoard;
    });
  };

  // console.log("배팅체크", board);
  const call = (bettingSize, phaseCallSize, money, player) => {
    if (bettingSize - phaseCallSize <= money) {
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          play.id === player.id
            ? {
                ...play,
                money: bettingSize - phaseCallSize,
                phaseCallSize: bettingSize,
              }
            : play
        );
        return {
          ...prev,
          players: updatedPlayers,
        };
      });
    }
  };
  const fold = (bettingSize, player) => {
    if (bettingSize !== 0) {
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          play.id === player.id
            ? {
                ...play,
                status: 0,
              }
            : play
        );
        return {
          ...prev,
          players: updatedPlayers,
        };
      });
    }
  };
  const check = (bettingSize, phaseCallSize, player) => {
    if (bettingSize === phaseCallSize) {
      publishBoardAction(board, player.id);
    }
  };
  const raise = (money, phaseCallSize, bettingSize, player) => {
    if (money - phaseCallSize > bettingSize * 2) {
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          play.id === player.id
            ? {
                ...play,
                status: amount === player.money ? 2 : play.status,
                money: play.money - amount,
                phaseCallSize: player.phaseCallSize + amount,
              }
            : play
        );
        return {
          ...prev,
          players: updatedPlayers,
          bettingPos: player.postion,
          bettingSize: amount,
        };
      });
    }
  };
  const raiseBet = (player) => {
    // updateBoard((prev) => {
    //   const updatedPlayers = prev.players.map((play) =>
    //     play.id === player.id
    //       ? {
    //           ...play,
    //           status: amount === player.money ? 2 : play.status,
    //           money: play.money - amount,
    //           phaseCallSize: player.phaseCallSize + amount,
    //         }
    //       : play
    //   );
    //   return {
    //     ...prev,
    //     players: updatedPlayers,
    //     bettingPos: player.postion,
    //     bettingSize: amount,
    //   };
    // });
  };
  const allIn = (bettingSize, phaseCallSize, money, player) => {
    if (
      bettingSize - phaseCallSize > money ||
      money * 2 < bettingSize - phaseCallSize
    ) {
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          play.id === player.id
            ? {
                ...play,
                status: 2,
                money: play.money - play.money,
              }
            : play
        );
        return {
          ...prev,
          players: updatedPlayers,
        };
      });
    }
  };
  const onHandleAmount = (e) => {
    setAmount(parseInt(e.target.value, 10));
  };

  const bettingMethod = (
    bettingSize,
    phaseCallSize,
    money,
    player,
    phaseStatus
  ) => {
    if (phaseStatus !== 0 && bettingSize === phaseCallSize) {
      return (
        <div>
          {message === "GAME_START" || message === "NEXT_ACTION" ? (
            <div>
              <button onClick={() => check(bettingSize, phaseCallSize, player)}>
                체크
              </button>
              <div>
                <input
                  onChange={onHandleAmount}
                  min={board.blind}
                  max={player.money}
                  value={amount}
                  type="range"
                />
                <span style={{ color: "red" }}>{amount}</span>
                <button
                  onClick={() =>
                    raise(money, phaseCallSize, bettingSize, player)
                  }
                >
                  레이즈
                </button>
              </div>
            </div>
          ) : null}

          {/* {isBet && isRaise && (
            <div>
              <button onClick={() => raiseBet(player)}>배팅</button>
            </div>
          )} */}
        </div>
      );
    } else if (
      phaseCallSize < bettingSize &&
      money <= bettingSize - phaseCallSize
    ) {
      return (
        <div>
          {message === "NEXT_ACTION" ? (
            <div>
              <button onClick={() => fold(bettingSize, player)}>폴드</button>
              <button
                onClick={() => allIn(bettingSize, phaseCallSize, money, player)}
              >
                올인
              </button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          {phaseStatus !== 0 && message === "NEXT_ACTION" ? (
            <div>
              <button onClick={() => fold(bettingSize, player)}>폴드</button>
              <button
                onClick={() => call(bettingSize, phaseCallSize, money, player)}
              >
                콜
              </button>
              <div>
                <input
                  onChange={onHandleAmount}
                  min={board.blind}
                  max={player.money}
                  value={amount}
                  type="range"
                />
                <button
                  onClick={() =>
                    raise(money, phaseCallSize, bettingSize, player)
                  }
                >
                  레이즈
                </button>
              </div>
            </div>
          ) : null}
          {/* {isRaise && (
            <div>
           
              <span style={{ color: "red" }}>{amount}</span>
              <button onClick={() => raiseBet(player)}>배팅</button>
            </div>
          )} */}
        </div>
      );
    }
  };

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]);

  const renderPlayer1 = (player) => {
    if (!player) {
      return null; // player가 존재하지 않으면 렌더링하지 않음
    }

    return (
      <React.Fragment key={player.id}>
        {board &&
          board.actionPos === player.position &&
          myPlayer === player && (
            <>
              <Timer>
                <ProgressBar now={progressValue} label={`${time}초`} animated />
              </Timer>
              {bettingMethod(
                board.bettingSize,
                player.phaseCallSize,
                player.money,
                player,
                board.phaseStatus
              )}
            </>
          )}

        <PlayerInfo>
          {player.position === 3 && <Button></Button>}
          <PlayerProfileInfo>
            <PlayerName>{player.playerName}</PlayerName>
            <BsEmojiSunglasses />
          </PlayerProfileInfo>

          {player.status !== 0 ? (
            <CardComponent board={board} player={player} myPlayer={myPlayer} />
          ) : null}
        </PlayerInfo>
      </React.Fragment>
    );
  };
  return <PlayContainer>{players.map(renderPlayer1)}</PlayContainer>;
}

export default Player;
