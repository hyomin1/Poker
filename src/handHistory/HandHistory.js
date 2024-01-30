import React, { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
`;
const Col = styled.div`
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;
const Phase = styled.div`
  background-color: black;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  background-color: gray;
  height: 90%;
`;

function HandHistory() {
  useEffect(() => {}, []);
  return (
    <Container>
      <Row>
        <Col>
          <Phase>블라인드(엔티)</Phase>
          <Content></Content>
        </Col>
        <Col>
          <Phase>프리 플랍</Phase>
          <Content></Content>
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
