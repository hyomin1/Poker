import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsEmojiSunglasses } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";
import CardComponent from "./CardComponent";
import { client } from "../../client";
import axios from "axios";
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";
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

const PlayerInfo = styled.div`
  display: flex;
  justify-content: center;
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

const PositionButton = styled.button`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const BettingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  flex-direction: ${(props) => (props.batch === "raise" ? "column" : "row")};
`;

const BettingButton = styled.button`
  background-color: #353b48;
  color: white;
  width: 150px;
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
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [board, setBoard] = useState(boardData);
  const [amount, setAmount] = useState(board.blind);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      message === "GAME_START" ||
      message === "NEXT_ACTION" ||
      message === "NEXT_PHASE_START"
    ) {
      const intervalId = setInterval(() => {
        setTime((prevNow) => (prevNow < 40 ? prevNow + 1 : prevNow));
      }, 1000);
      if (time === 40) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [message, time]);
  console.log(message, time);
  const progressValue = (time / 40) * 100;

  useEffect(() => {
    if (
      board &&
      time === 40 &&
      (message === "GAME_START" ||
        message === "NEXT_ACTION" ||
        message === "NEXT_PHASE_START")
    ) {
      const foldPlayer = board.players.find(
        (player) => player.position === board.actionPos
      );
      console.log("타임아웃플레이어", foldPlayer, board.actionPos); //check용

      timeOut(foldPlayer);

      return () => {};
    }
  }, [time, board, message]);

  const timeOut = async (player) => {
    //console.log("확인", player);
    setTime(0);
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
    }, player.id);
    if (player === myPlayer) {
      try {
        const res = await axios.put(`${BASE_URL}/api/board/exit`, board);
        //console.log("타임아웃");
        setBoard(res.data);
        //client.deactivate()
        navigate("/login");
      } catch (error) {
        console.log("타임 아웃 에러", error);
      }
    }
  };

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]); //최신 보드 데이터 저장

  const publishBoardAction = (updatedBoard, playerId) => {
    //websokcet 통신 함수
    client.publish({
      destination: "/pub/board/action",
      body: JSON.stringify(updatedBoard),
      headers: { PlayerId: playerId },
    });
  };
  const updateBoard = (update, playerId) => {
    //board 업데이트 함수
    setBoard((prev) => {
      const updatedBoard = update(prev);
      publishBoardAction(updatedBoard, playerId);
      return updatedBoard;
    });
  };

  // console.log("배팅체크", board);
  const call = (bettingSize, phaseCallSize, money, player) => {
    if (bettingSize - phaseCallSize <= money) {
      setTime(0);
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          player && play.id === player.id
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
      }, player.id);
    }
  };
  const fold = (bettingSize, player) => {
    if (bettingSize !== 0) {
      setTime(0);
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          player && play.id === player.id
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
      }, player.id);
    }
  };
  const check = (bettingSize, phaseCallSize, player) => {
    if (bettingSize === phaseCallSize) {
      setTime(0);
      publishBoardAction(board, player.id);
    }
  };
  const raise = (money, phaseCallSize, bettingSize, player) => {
    if (money - phaseCallSize > bettingSize * 2) {
      setTime(0);
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          player && play.id === player.id
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
      }, player.id);
    }
  };

  const allIn = (bettingSize, phaseCallSize, money, player) => {
    if (
      bettingSize - phaseCallSize > money ||
      money * 2 < bettingSize - phaseCallSize
    ) {
      setTime(0);
      updateBoard((prev) => {
        const updatedPlayers = prev.players.map((play) =>
          player && play.id === player.id
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
      }, player.id);
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
        <>
          {message === "GAME_START" ||
          message === "NEXT_ACTION" ||
          message === "NEXT_PHASE_START" ||
          message === "PLAYER_EXIT" ? (
            <BettingButtonContainer batch="raise">
              <div style={{ display: "flex" }}>
                <RaiseInputContainer />
                <RaiseInputContainer>
                  <span style={{ color: "red" }}>{amount}</span>
                  <input
                    onChange={onHandleAmount}
                    min={board.blind}
                    max={player.money}
                    value={amount}
                    type="range"
                    step={1000}
                  />
                </RaiseInputContainer>
              </div>
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
          {message === "GAME_START" ||
          message === "NEXT_ACTION" ||
          message === "NEXT_PHASE_START" ||
          message === "PLAYER_EXIT" ? (
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
          {phaseStatus !== 0 &&
          (message === "GAME_START" ||
            message === "NEXT_ACTION" ||
            message === "NEXT_PHASE_START" ||
            message === "PLAYER_EXIT") ? (
            <BettingButtonContainer batch="raise">
              <div style={{ display: "flex" }}>
                <RaiseInputContainer />
                <RaiseInputContainer />
                <RaiseInputContainer>
                  <span style={{ color: "red" }}>{amount}</span>
                  <input
                    onChange={onHandleAmount}
                    min={board.blind}
                    max={player.money}
                    value={amount}
                    type="range"
                  />
                </RaiseInputContainer>
              </div>
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
                  레이즈
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
        {board &&
          board.actionPos === player.position &&
          myPlayer === player &&
          (message === "GAME_START" ||
            message === "NEXT_ACTION" ||
            message === "NEXT_PHASE_START") && (
            <>
              <Timer>
                <ProgressBar now={progressValue} label={`${time}초`} animated />
              </Timer>
            </>
          )}

        <PlayerInfo>
          {player.position === 3 && <PositionButton />}
          <PlayerProfileInfo>
            <PlayerName>{player.playerName}</PlayerName>
            <BsEmojiSunglasses />
          </PlayerProfileInfo>

          {player.status !== 0 ? (
            <CardComponent board={board} player={player} myPlayer={myPlayer} />
          ) : null}
        </PlayerInfo>
        {board &&
          board.actionPos === player.position &&
          myPlayer === player &&
          bettingMethod(
            board.bettingSize,
            player.phaseCallSize,
            player.money,
            player,
            board.phaseStatus
          )}
      </React.Fragment>
    );
  };
  return <PlayContainer>{players.map(renderPlayer1)}</PlayContainer>;
}

export default Player;
