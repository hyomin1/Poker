import React from 'react';

export default function Chip({ amount }) {
  return (
    <div className='relative'>
      {/* 칩 스택 효과를 위한 배경 원들 */}
      <div className='absolute w-12 h-12 bg-gray-800 rounded-full -bottom-0.5'></div>
      <div className='absolute w-12 h-12 bg-gray-700 rounded-full -bottom-1'></div>

      {/* 메인 칩 */}
      <div className='relative flex items-center justify-center w-12 h-12 bg-blue-600 border-2 border-blue-300 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-blue-700'>
        <div className='flex items-center justify-center w-8 h-8 border border-blue-300 rounded-full'>
          <span className='text-xs font-bold text-white'>{amount}</span>
        </div>
      </div>
    </div>
  );
}
