import React from 'react';

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-16 h-16 mb-4 border-4 border-gray-200 rounded-full border-t-purple-600 animate-spin' />
      <p className='text-lg font-medium text-gray-600'>로딩중...</p>
    </div>
  );
}
