import React from 'react';

export default function CardBack() {
  return (
    <div className='flex items-center justify-center w-16 h-24 bg-white border-2 border-gray-200 rounded-lg shadow-xl'>
      <img
        className='bg-gray-100 rounded '
        src={`/images/cardBack.jpg`}
        alt='cardBack'
      />
    </div>
  );
}
