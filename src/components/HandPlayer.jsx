import React from 'react';
import Card from './Card';
import DealerButton from './DealerButton';
import { POSITION_COLORS, POSITIONS } from '../constants/boardConstants';

export default function HandPlayer({ subId, player, btn }) {
  const { userName, position } = player;
  const isDealer = position === btn; // 딜러 포지션
  const index = (position - btn + 6) % 6;

  return (
    <div className='relative flex flex-col items-center gap-3 group'>
      <div className='relative flex flex-col items-center'>
        <div
          className={`w-20 h-20 ${POSITION_COLORS[index]} 
          flex justify-center items-center rounded-full
          shadow-lg transform transition-all duration-300
          border-2 border-white/20 backdrop-blur-sm
          group-hover:scale-105 group-hover:shadow-emerald-500/20
          group-hover:border-emerald-400/30`}
        >
          <span className='text-lg font-bold text-white drop-shadow-md'>
            {POSITIONS[index]}
          </span>
        </div>

        <div className='absolute w-full text-center -bottom-8'>
          <span
            className='px-4 py-1.5 text-sm font-medium text-white 
            bg-black/60 rounded-full backdrop-blur-sm
            border border-white/10 shadow-lg
            transition-all duration-300 group-hover:bg-black/80
            group-hover:border-emerald-400/30'
          >
            {userName}
          </span>
        </div>
      </div>

      <div className='flex gap-2 mt-4 transition-all duration-300 transform group-hover:scale-105 group-hover:translate-y-1'>
        <Card card={player.card1} />
        <Card card={player.card2} />
      </div>

      {isDealer && (
        <div className='absolute bottom-0 -right-12 animate-bounce'>
          <DealerButton />
        </div>
      )}
    </div>
  );
}
