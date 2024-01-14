import React, { useEffect } from "react";
import { styled } from "styled-components";
import { client } from "../client";
import TableComponent from "./gameComponents/TableComponent";

const PlayingContainer = styled.div``;

function Playing({ board, myPlayer, setBoard, client }) {
  // useEffect(() => {
  //   client.subscribe(`/topic/chat/${boardData.id}`, function (message) {
  //     console.log(message.body);
  //   });
  // }, []);

  return (
    <PlayingContainer>
      <TableComponent
        myPlayer={myPlayer}
        board={board}
        setBoard={setBoard}
        client={client}
      />
      ;
    </PlayingContainer>
  );
}

export default Playing;
