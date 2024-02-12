import axios from "axios";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import HandHistoryTable from "./HandHistoryTable";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50%;
  background-color: #141414;
`;
const Col = styled.div`
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Phase = styled.div`
  background-color: #141414;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
`;
const Content = styled.div`
  background-color: #3b3b3f;
  height: 90%;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 10px 20px;
`;
const DetailContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Postion = styled.div`
  margin-right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BetDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 8px;

  //max-width: 300px;
`;
function HandHistory() {
  useEffect(() => {
    const getHandHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/handHistory`);
        console.log(res.data);
      } catch (error) {
        console.error("핸드 히스토리 가져오기", error);
        if (error.response) {
          //alert(error.response.data.message);
        }
      }
    };
    getHandHistory();
  }, []);
  const testData = [
    {
      postion: "UTG",
      bet: "폴드",
    },
    {
      postion: "MP",
      bet: "폴드",
    },
    {
      postion: "CO",
      bet: "폴드",
    },
  ];

  return (
    <Container>
      <HandHistoryTable />
      <Row>
        <Col>
          <Phase>프리 플랍</Phase>
          <Content>
            {testData.map((data, index) => (
              <DetailContainer key={index}>
                <Postion>{data.postion}</Postion>
                <BetDetail>{data.bet}</BetDetail>
              </DetailContainer>
            ))}
          </Content>
        </Col>
        <Col>
          <Phase>플랍</Phase>
          <Content></Content>
        </Col>
        <Col>
          <Phase>턴</Phase>
          <Content></Content>
        </Col>
        <Col>
          <Phase>리버</Phase>
          <Content></Content>
        </Col>
      </Row>
    </Container>
  );
}

export default HandHistory;
