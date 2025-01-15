import React from 'react';
import { MAX_PLAYER } from '../constants/boardConstants';

export default function GameStatusHeader({ isWaiting, onExit, playerCount }) {
  return (
    <div className='absolute left-0 right-0 z-10 px-6 top-4'>
      <div className='flex items-center justify-between p-3 text-white rounded-lg shadow-lg bg-black/30 backdrop-blur-sm'>
        <div className='flex items-center space-x-4'>
          {isWaiting && (
            <div className='flex items-center'>
              <span className='relative flex w-3 h-3 mr-3'>
                <span className='absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-ping'></span>
                <span className='relative inline-flex w-3 h-3 bg-yellow-500 rounded-full'></span>
              </span>
              <span className='font-medium'>대기중</span>
            </div>
          )}
          <div className='flex items-center bg-white/10 rounded-lg px-3 py-1.5'>
            <span className='font-medium'>
              {playerCount}/{MAX_PLAYER}
            </span>
          </div>
        </div>
        <button
          onClick={onExit}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition-colors duration-200 font-medium flex items-center'
        >
          나가기
        </button>
      </div>
    </div>
  );
}
