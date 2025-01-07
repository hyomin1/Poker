import React, { useState } from 'react';

export default function Board({ board, enterGameMutation }) {
  const [bb, setBB] = useState(50);
  return (
    <div className='border border-black'>
      <p>{board.totalPlayer}/6</p>
      {board.phaseStatus === 0 ? <p>대기중</p> : <p>게임중</p>}
      <button
        onClick={() =>
          enterGameMutation.mutate({
            boardId: board.id,
            bb,
            blind: board.blind,
          })
        }
      >
        입장 하기
      </button>
    </div>
  );
}
