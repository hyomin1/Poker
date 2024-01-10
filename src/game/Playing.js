import React from "react";
import { styled } from "styled-components";
import TableComponent from "./gameComponents/TableComponent";

const PlayingContainer = styled.div``;

function Playing({ boardData }) {
  return (
    <PlayingContainer>
      <TableComponent boardData={boardData} />;
    </PlayingContainer>
  );
}

export default Playing;
