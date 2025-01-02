import React from 'react';

export default function AuthImage() {
  return (
    <div className='bg-[#26122B] flex items-start  rounded-2xl flex-col h-full w-full '>
      <img
        src={'/images/pokerBg.png'}
        alt='bgImage'
        className='w-full h-5/6 rounded-2xl'
      />
      <h1 className='mt-8 ml-20 font-bold text-white'>Let's Play Poker</h1>
    </div>
  );
}
