import React, { useState } from 'react';
import { BuyInModal } from './BuyInModal';
import useAuthStore from '../stores/useAuthStore';

import Room from './Room';
import { BLINDS } from '../constants/boardConstants';

export default function Rooms({
  boards,
  blindIndex,
  refetch,
  quickJoinMutation,
  enterGameMutation,
}) {
  const { userId, password, subId } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blind = BLINDS[blindIndex];

  const handleConfirm = async (bb) => {
    const { id: boardId } = await quickJoinMutation.mutateAsync({ blind, bb });
    const url = `/board/${boardId}`;

    const game = window.open('about:blank', '_blank');
    game.name = JSON.stringify({ userId, password, subId });
    game.location = url;

    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <h2 className='text-xl font-semibold text-purple-400'>
          블라인드: {blind}
        </h2>
        <div className='space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-4 py-2 text-white transition-all duration-200 transform rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
          >
            빠른 참가
          </button>
          <button
            onClick={refetch}
            className='px-4 py-2 text-white transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          >
            새로 고침
          </button>
        </div>
      </div>
      <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
        {boards.map((board) => (
          <Room
            key={board.id}
            board={board}
            enterGameMutation={enterGameMutation}
          />
        ))}
      </div>
      <BuyInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title='빠른 참가 바이인 설정'
      />
    </div>
  );
}
