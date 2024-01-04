import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../clinet";

const PlayContainer = styled.div`
  background-color: #353b48;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
`;
const TableContainer = styled.div`
  width: 100vw;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.div`
  width: 70%;
  height: 60%;
  border-radius: 80px;
  background-color: #44bd32;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 60px;
  height: 90px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

function Play(props) {
  //   const {
  //     state: { borderData },
  //   } = useLocation();

  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    //gameStart true일때만
    if (gameStart) {
      client.activate();
    }

    return () => client.deactivate();
  }, [gameStart]); //gameStart가 변경될때마다 실행
  return (
    <PlayContainer>
      <PlayerCount>1/6</PlayerCount>
      <TableContainer>
        <Table>
          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
        </Table>
      </TableContainer>
    </PlayContainer>
  );
}

export default Play;
