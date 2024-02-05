import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import { styled } from "styled-components";
import { BASE_URL } from "../api";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
const BoardInform = styled.img`
  width: 900px;
  height: 300px;
  border-radius: 10px;
`;
const NoBoard = styled.div`
  width: 900px;
  height: 300px;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 18px;
  font-weight: bold;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
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
function GameRoomList({ blind1, blind2, blind3, blind4, userData, userId }) {
  const [bb, setBb] = useState(50);
  const [isPlay, isSetPlay] = useState(false);
  const [type, setType] = useState(0);
  const [blind, setBlind] = useState();
  const [board, setBoard] = useState();
  // const [blind1, setBlind1] = useState(blind1000Data);
  // const [blind2, setBlind2] = useState(blind2000Data);
  // const [blind3, setBlind3] = useState(blind4000Data);
  // const [blind4, setBlind4] = useState(blind10000Data);
  // console.log(blind1);

  // const getBoardList = async () => {
  //   try {
  //     const [res1, res2, res3, res4] = await Promise.all([
  //       await axios.get(`${BASE_URL}/api/board/search/${1000}`),
  //       await axios.get(`${BASE_URL}/api/board/search/${2000}`),
  //       await axios.get(`${BASE_URL}/api/board/search/${4000}`),
  //       await axios.get(`${BASE_URL}/api/board/search/${10000}`),
  //     ]);
  //     setBlind1(res1.data);
  //     setBlind2(res2.data);
  //     setBlind3(res3.data);
  //     setBlind4(res4.data);
  //   } catch (error) {
  //     if (error.response) {
  //       alert(error.response.data.message);
  //     }
  //     console.error("방검색 에러", error);
  //   }
  // };
  // useEffect(() => {
  //   //getBoardList();
  // }, []);

  const handleMoneyChange = (e) => {
    setBb(parseInt(e.target.value, 10));
  };

  const playGame = (cancel) => {
    isSetPlay((prev) => !prev);
    console.log(cancel);
    if (cancel) {
      setBb(50);
    }
  };
  const f1 = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
        params: {
          bb,
          blind,
        },
      });
      const goGame = window.open("/gameRoom", `gameRoom${res.data.id}`);
      const sendData = {
        userData: userData,
        userId: userId,
        boardData: res.data,
      };
      goGame.name = JSON.stringify(sendData);
    } catch (error) {
      console.log(error);
    }
  };
  const f2 = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/board/joinGame/${board.id}`,
        null,
        {
          params: {
            boardId: board.id,
            bb,
          },
        }
      );
      const userIdInt = parseInt(userId, 10);
      const isExistUser = board.players.some(
        (player) => player.userId === userIdInt
      );
      console.log(isExistUser);
      if (isExistUser) {
        alert("이미 참여하고 있는 게임입니다.");
      } else {
        const goGame = window.open("/gameRoom", `gameRoom${board.id}`);
        const sendData = {
          userData: userData,
          userId: userId,
          boardData: res.data,
        };
        goGame.name = JSON.stringify(sendData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (blind) => {
    playGame();
    setType(1);
    setBlind(blind);
  };
  const enterGame = async (boardData) => {
    playGame();
    setType(2);
    setBoard(boardData);
  };
  const buyIn = () => {
    if (type === 1) {
      f1();
    } else if (type === 2) {
      f2();
    }
    playGame();
    //getBoardList();
  };

  const renderCarousel = (blindData, unique) => (
    <Carousel key={unique}>
      {blindData.map((board, index) => (
        <Carousel.Item key={index} interval={10000}>
          <BoardInform src="/images/board.jpg" className="d-block w-100" />
          <Carousel.Caption>
            <h3>NO. {board.id}</h3>
            <p>{board.totalPlayer}/6</p>
            {board.phaseStatus === 0 ? <p>대기중</p> : <p>게임중</p>}
            <button onClick={() => enterGame(board)}>방 입장하기</button>
            <button onClick={() => createRoom(board.blind)}>빠른 참가</button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return (
    <React.Fragment>
      <Grid>
        {blind1.length >= 1 ? (
          renderCarousel(blind1, "blind1000")
        ) : (
          <NoBoard>
            방이 없습니다
            <button onClick={() => createRoom(1000)}>방만들기</button>
          </NoBoard>
        )}
        {blind2.length >= 1 ? (
          renderCarousel(blind2, "blind2000")
        ) : (
          <NoBoard>
            방이 없습니다
            <button onClick={() => createRoom(2000)}>방만들기</button>
          </NoBoard>
        )}
        {blind3.length >= 1 ? (
          renderCarousel(blind3, "blind4000")
        ) : (
          <NoBoard>
            방이 없습니다
            <button onClick={() => createRoom(4000)}>방만들기</button>
          </NoBoard>
        )}
        {blind4.length >= 1 ? (
          renderCarousel(blind4, "blind10000")
        ) : (
          <NoBoard>
            방이 없습니다
            <button onClick={() => createRoom(10000)}>방만들기</button>
          </NoBoard>
        )}
      </Grid>

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
              min="50"
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
    </React.Fragment>
  );
}

export default GameRoomList;
