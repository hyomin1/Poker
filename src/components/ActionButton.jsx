import React from 'react';

export default function ActionButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className='px-8 py-3 font-bold text-white transition-all duration-200 rounded-full shadow-lg hover:transform hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600'
    >
      {label}
    </button>
  );
}
