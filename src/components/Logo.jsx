import React from 'react';

export default function Logo() {
  return (
    <div className='flex items-center'>
      <img
        src={'/images/logo.png'}
        alt='logo'
        className='w-12 h-12 rounded-lg'
      />
      <h2 className='ml-2 font-bold'>포커 게임</h2>
    </div>
  );
}
