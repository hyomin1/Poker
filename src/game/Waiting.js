import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { styled } from "styled-components";
import TableComponent from "./gameComponents/TableComponent";
import Button from "react-bootstrap/Button";

const WaitingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpinnerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Waiting({ board, myPlayer }) {
  return (
    <WaitingContainer>
      <SpinnerOverlay>
        <Button variant="primary" disabled size="lg">
          <Spinner as="span" animation="grow" size="sm" role="status" />
          플레이어 대기중
        </Button>
      </SpinnerOverlay>
      <TableComponent myPlayer={myPlayer} board={board} />
    </WaitingContainer>
  );
}

export default Waiting;
