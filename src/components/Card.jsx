import React from 'react';

export default function Card({ card }) {
  const cardShape = Math.floor(card / 13);
  const cardNum = card % 13;
  const getCardShape = (shape) => {
    switch (shape) {
      case 0:
        return 'spades';
      case 1:
        return 'diamonds';
      case 2:
        return 'hearts';
      case 3:
        return 'clubs';
      default:
        return '';
    }
  };
  const getCardNum = (num) => {
    if (num >= 0 && num <= 8) {
      return num + 2;
    }
    switch (num) {
      case 9:
        return 'jack';
      case 10:
        return 'queen';
      case 11:
        return 'king';
      case 12:
        return 'ace';
      default:
        return '';
    }
  };

  return (
    <div className='flex items-center justify-center w-16 h-24 bg-white border-2 border-gray-200 rounded-lg shadow-xl'>
      <img
        className='bg-gray-100 rounded '
        src={`/images/${getCardNum(cardNum)}_of_${getCardShape(cardShape)}.png`}
        alt={`Card${card}`}
      />
    </div>
  );
}
