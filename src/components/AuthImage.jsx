import React from 'react';

export default function AuthImage() {
  return (
    <div className='w-full h-full p-6 shadow-2xl bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl'>
      <div className='relative overflow-hidden h-5/6 rounded-2xl'>
        <img
          src='/images/pokerBg.png'
          alt='bgImage'
          className='object-cover w-full h-full transition-transform duration-700 transform hover:scale-105'
        />
      </div>
      <h1 className='mt-8 ml-8 text-3xl font-bold tracking-wide text-white'>
        Let's Play Poker
      </h1>
    </div>
  );
}
