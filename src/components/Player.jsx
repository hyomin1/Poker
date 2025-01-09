import React from 'react';
import Card from './Card';
import DealerButton from './DealerButton';
import ActionButton from './ActionButton';
import Chip from './Chip';

export default function Player({ subId, player, gameBoard }) {
  console.log(player);
  console.log(gameBoard);
  const isDealer = player.position === gameBoard.btn;

  return (
    <div className='relative flex flex-col items-center gap-2'>
      {/* 플레이어 정보 영역 */}
      <div className='flex flex-col items-center gap-2'>
        {/* 아바타와 칩 */}
        <div className='relative'>
          <div className='flex items-center justify-center w-20 h-20 bg-gray-700 rounded-full shadow-lg'>
            <div className='w-16 h-16 bg-gray-600 border-2 border-gray-500 rounded-full' />
          </div>
          {/* 칩 표시 - 아바타 우측 상단에 위치 */}
          <div className='absolute -top-2 -right-4'>
            <Chip amount={player.chips || 0} />
          </div>
        </div>

        {/* 베팅 금액이 있는 경우 테이블 중앙을 향해 표시 */}
        {player.currentBet > 0 && (
          <div className='absolute -top-8'>
            <Chip amount={player.currentBet} />
          </div>
        )}

        {/* 플레이어 이름 */}
        <div className='absolute w-full text-center -bottom-6'>
          <span className='px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded-full'>
            {player.name}
          </span>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className='flex gap-2 mt-2'>
        <Card card={player.card1} />
        <Card card={player.card2} />
      </div>

      {/* 딜러 버튼 */}
      {isDealer && (
        <div className='absolute bottom-0 -right-12'>
          <DealerButton />
        </div>
      )}

      {/* 액션 버튼 */}

      <div className='absolute bottom-0 flex gap-4 p-6 mt-4 transform -translate-x-1/2 translate-y-full bg-black left-1/2 bg-opacity-30 rounded-xl backdrop-blur-sm'>
        <ActionButton label='FOLD' />
        <ActionButton label='CHECK' />
        <ActionButton label='CALL' />
        <ActionButton label='RAISE' />
      </div>
    </div>
  );
}
