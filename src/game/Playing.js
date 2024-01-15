import { styled } from "styled-components";
import TableComponent from "./gameComponents/TableComponent";

const PlayingContainer = styled.div``;

function Playing({ board, myPlayer, setBoard, client, message }) {
  return (
    <PlayingContainer>
      <TableComponent
        myPlayer={myPlayer}
        board={board}
        setBoard={setBoard}
        client={client}
        message={message}
      />
      ;
    </PlayingContainer>
  );
}

export default Playing;
