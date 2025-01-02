import React from 'react';

export default function Button({ text }) {
  return (
    <button className='w-full h-12 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg'>
      {text}
    </button>
  );
}
