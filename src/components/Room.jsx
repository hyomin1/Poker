import React, { useState } from 'react';
import { BuyInModal } from './BuyInModal';
import useAuthStore from '../stores/useAuthStroe';

export default function Room({ board, enterGameMutation }) {
  const { userId, password } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = (bb) => {
    const boardId = board.id;
    enterGameMutation.mutate({
      boardId,
      bb,
      blind: board.blind,
    });
    const url = `/board/${boardId}`;
    const game = window.open(url, '_blank');
    game.addEventListener('load', () => {
      game.postMessage({ userId, password }, '*');
    });
    setIsModalOpen(false);
  };
  return (
    <div className='bg-gray-700 rounded-lg p-6 shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div
            className={`w-3 h-3 rounded-full ${
              board.phaseStatus === 0 ? 'bg-green-400' : 'bg-yellow-400'
            }`}
          />
          <span className='text-sm font-medium'>
            {board.phaseStatus === 0 ? '대기중' : '게임중'}
          </span>
        </div>
        <div className='px-3 py-1 bg-gray-800 rounded-full'>
          <span className='font-semibold text-purple-400'>
            {board.totalPlayer}/6
          </span>
        </div>
      </div>

      <div className='mt-4'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
        >
          입장하기
        </button>
      </div>
      <BuyInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title='입장 바이인 설정'
      />
    </div>
  );
}
