import React, { useState } from "react";
import { styled } from "styled-components";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../api";
import { client } from "../client";
import { Cookies, useCookies } from "react-cookie";

const GameContainer = styled.div`
  background-color: #353b48;
  height: 100vh;
  width: 100vw;
`;
const TitleBox = styled.div`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  color: yellow;
  font-weight: bold;
  font-size: 48px;
`;

const ProfileBox = styled.div`
  height: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 150px;
`;

const ProfileIcon = styled.div`
  svg {
    width: 45px;
    height: 45px;
  }
  margin-right: 10px;
`;

const ProfileUser = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

const PlayBox = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayBtn = styled.button`
  height: 35px;
  margin: 0px 50px;
`;
const InputBox = styled(motion.div)``;

const MoneyInput = styled.input``;

const MoenyStatus = styled.p``;

const MoneyBtn = styled.button``;

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
        withCredentials: true,
      });
      console.log("게임정보", res.data);
      navigate("/play", { state: { boardData: res.data } });
    } catch (error) {
      console.log("바이인 에러", error);
    }
    //navigate("/play");
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

        <ProfileUser>{userData.userName}</ProfileUser>
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
              <MoenyStatus>{bb}</MoenyStatus>
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
