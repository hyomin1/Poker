import React, { useState } from "react";
import { styled } from "styled-components";
import { IoPersonCircle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../api";
import { client } from "../client";

const GameContainer = styled.div`
  background-color: #2c3e50;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TitleBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  color: #e74c3c;
  font-weight: bold;
  font-size: 48px;
`;

const ProfileBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
`;

const ProfileIcon = styled.div`
  svg {
    width: 45px;
    height: 45px;
    color: #f5f6fa;
  }
`;

const ProfileUser = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #ecf0f1;
`;

const PlayBox = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const PlayBtn = styled.button`
  height: 40px;
  width: 150px;
  background-color: #27ae60;
  border: 2px solid #2ecc71;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    background-color: #2ecc71;
  }
`;

const InputBox = styled(motion.div)`
  background-color: rgba(44, 62, 80, 0.9); /* 투명한 배경 색상 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ecf0f1;
  position: fixed;
`;

// 나머지 코드는 그대로 유지

const MoneyInput = styled.input`
  width: 80%;
  margin: 10px 0;
  background-color: #2c3e50;
  color: #ecf0f1;
  border: none;
  border-bottom: 2px solid #3498db;
  padding: 5px;
  font-size: 16px;
`;

const MoneyStatus = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const MoneyBtn = styled.button`
  width: 120px;
  height: 35px;
  background-color: #2980b9;
  border: none;
  border-radius: 5px;
  color: white;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #2574a9;
  }
`;

const inputVar = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.5,
    },
  },
  leaving: {
    opacity: 0,
    scale: 0,
  },
};
function GameMenu() {
  const navigate = useNavigate();

  client.onConnect = async function (frame) {
    console.log("웹소켓 연결 완료");
  };

  const {
    state: { userData },
  } = useLocation();

  const [bb, setBb] = useState(0);
  const [isPlay, isSetPlay] = useState(false);

  const handleMoneyChange = (e) => {
    setBb(parseInt(e.target.value, 10));
  };

  const playGame = (cancel) => {
    isSetPlay((prev) => !prev);
    if (cancel) {
      setBb(0);
    }
  };

  const buyIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
        params: {
          bb,
        },
      });
      console.log("게임정보", res.data);
      if (client && client.connected) {
        const subscription = client.subscribe(
          `/topic/${res.data.id}`,
          function (message) {}
        ); //게임 입장시 단체 큐 구독
      } else {
        client.connectHeaders = {
          userId: userData.userId,
          password: userData.password,
        };
        client.activate();
      }

      navigate("/gameRoom", {
        state: { boardData: res.data, userData: userData },
      });
    } catch (error) {
      console.log("바이인 에러", error);
    }
  };
  return (
    <GameContainer>
      <TitleBox>
        <Title>Poker Game</Title>
      </TitleBox>

      <ProfileBox>
        <ProfileIcon>
          <IoPersonCircle />
        </ProfileIcon>

        <ProfileUser>
          {userData.userName ? userData.userName : "player"}
        </ProfileUser>
      </ProfileBox>

      <PlayBox>
        <PlayBtn onClick={playGame}>게임 시작</PlayBtn>

        <AnimatePresence>
          {isPlay ? (
            <InputBox
              variants={inputVar}
              initial="start"
              animate="visible"
              exit="leaving"
            >
              <MoneyInput
                type="range"
                id="money"
                min="0"
                max="100"
                value={bb}
                onChange={handleMoneyChange}
              />
              <MoneyStatus>{bb}</MoneyStatus>
              <MoneyBtn onClick={buyIn}>바이인</MoneyBtn>
              <MoneyBtn onClick={() => playGame("cancel")}>취소</MoneyBtn>
            </InputBox>
          ) : null}
        </AnimatePresence>

        <PlayBtn>핸드 히스토리</PlayBtn>
      </PlayBox>
    </GameContainer>
  );
}

export default GameMenu;
