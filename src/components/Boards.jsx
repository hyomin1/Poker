import React from 'react';
import Board from './Board';

export default function Boards({
  boards,
  refetch,
  quickJoinMutation,
  enterGameMutation,
}) {
  console.log(boards);
  const blind = boards[0].blind;
  return (
    <div>
      <p>{blind}</p>
      <div>
        <button onClick={() => quickJoinMutation.mutate({ blind, bb: 50 })}>
          빠른 참가
        </button>
        <button onClick={refetch}>새로 고침</button>
      </div>
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          enterGameMutation={enterGameMutation}
        />
      ))}
    </div>
  );
}
