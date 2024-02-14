import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { IoMdRefresh } from "react-icons/io";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Blind = styled.h1`
  font-size: 25px;
  color: whitesmoke;
  font-weight: bold;
`;
const SettingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #fff;
    height: 35px;
    width: 35px;
    &:hover {
      fill: #e5e5e5;
    }
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
function GameRoomList({
  blind1,
  blind2,
  blind3,
  blind4,
  userData,
  userId,
  getBlind1,
  getBlind2,
  getBlind3,
  getBlind4,
}) {
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

    if (cancel) {
      setBb(50);
    }
  };
  const f1 = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
        params: {
          bb: 100,
          blind: 90000,
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
      alert(error.response.data.message);
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
            bb: 100,
          },
        }
      );
      console.log("확인", res.data);
      const userIdInt = parseInt(userId, 10);
      const isExistUser = board.players.some(
        (player) => player.userId === userIdInt
      );
      //console.log(isExistUser);
      if (!isExistUser) {
        const goGame = window.open("/gameRoom", `gameRoom${board.id}`);
        const sendData = {
          userData: userData,
          userId: userId,
          boardData: res.data,
        };
        goGame.name = JSON.stringify(sendData);
      }
    } catch (error) {
      alert(error.response.data.message);
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

  const refreshTable = (blind) => {
    // 새로고침 버튼

    if (blind === 90000) {
      getBlind1();
    } else if (blind === 2000) {
      getBlind2();
    } else if (blind === 4000) {
      getBlind3();
    } else if (blind === 10000) {
      getBlind4();
    }
  };

  const renderTable = (blindData, blind) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title>
        <Blind>Blind : {blind}</Blind>
        <button onClick={() => createRoom(blind)}>빠른 참가</button>

        <SettingBox>
          <IoMdRefresh onClick={() => refreshTable(blind)} />
        </SettingBox>
      </Title>
      <div
        style={{
          maxHeight: "25vh",
          height: "25vh",
          width: "35vw",
          overflowY: "auto",
        }}
      >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>NO</th>
              <th>인원</th>
              <th>게임 상태</th>
              <th>입장 여부</th>
            </tr>
          </thead>
          <tbody>
            {blindData.map((board, index) => (
              <tr key={index}>
                <td>{board.id}</td>
                <td>{board.totalPlayer}/6</td>
                <td>
                  {board.phaseStatus === 0 ? <p>대기중</p> : <p>게임중</p>}
                </td>
                <td>
                  <button onClick={() => enterGame(board)}>입장하기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
  const renderNoTable = (blind) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title>
        <Blind>Blind : {blind}</Blind>
        <button onClick={() => createRoom(blind)}>랜덤 매칭</button>
        <button onClick={() => refreshTable(blind)}>새로 고침</button>
      </Title>
      <div
        style={{
          maxHeight: "25vh",
          height: "25vh",
          width: "35vw",
          overflowY: "auto",
        }}
      >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>NO</th>
              <th>인원</th>
              <th>게임 상태</th>
              <th>입장 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>방이 없습니다</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Grid>
        {blind1.length >= 1 ? renderTable(blind1, 1000) : renderNoTable(1000)}
        {blind2.length >= 1 ? renderTable(blind2, 2000) : renderNoTable(2000)}
        {blind3.length >= 1 ? renderTable(blind3, 4000) : renderNoTable(4000)}
        {blind4.length >= 1 ? renderTable(blind4, 10000) : renderNoTable(10000)}
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
