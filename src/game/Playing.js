import React, { useEffect } from "react";
import { styled } from "styled-components";
import { client } from "../client";
import TableComponent from "./gameComponents/TableComponent";

const PlayingContainer = styled.div``;

function Playing({ boardData }) {
  // useEffect(() => {
  //   client.subscribe(`/topic/chat/${boardData.id}`, function (message) {
  //     console.log(message.body);
  //   });
  // }, []);

  return (
    <PlayingContainer>
      <TableComponent boardData={boardData} />;
    </PlayingContainer>
  );
}

export default Playing;
