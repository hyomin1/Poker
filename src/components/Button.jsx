import React from 'react';

export default function Button({ text }) {
  return (
    <button className='w-full h-10 text-white rounded-3xl bg-brand hover:brightness-110'>
      {text}
    </button>
  );
}
