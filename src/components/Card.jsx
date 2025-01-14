import React from 'react';
import { CARDS_PER_SUIT, RANKS, SUITS } from '../constants/cardConstant';

export default function Card({ card, isJokBo }) {
  const cardShape = Math.floor(card / CARDS_PER_SUIT);
  const cardNum = card % CARDS_PER_SUIT;
  const getCardShape = (shape) => {
    switch (shape) {
      case 0:
        return SUITS.SPADE;
      case 1:
        return SUITS.DIAMOND;
      case 2:
        return SUITS.HEART;
      case 3:
        return SUITS.CLUB;
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
        return RANKS.JACK;
      case 10:
        return RANKS.QUEEN;
      case 11:
        return RANKS.KING;
      case 12:
        return RANKS.ACE;
      default:
        return '';
    }
  };

  return (
    <div className='flex items-center justify-center w-16 h-24 bg-white border-2 border-gray-200 rounded-lg shadow-xl'>
      <img
        className={`bg-gray-100 rounded transition-all duration-300 ${
          isJokBo
            ? 'ring-8 ring-red-500 shadow-2xl scale-110 transform hover:scale-115 z-10'
            : 'hover:scale-105'
        }`}
        src={`/images/${getCardNum(cardNum)}_of_${getCardShape(cardShape)}.png`}
        alt={`Card${card}`}
      />
    </div>
  );
}
