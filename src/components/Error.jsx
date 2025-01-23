import React from 'react';

export default function Error() {
  const refresh = () => {
    window.location.reload();
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col items-center text-center'>
          <div className='flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full'>
            <span className='text-2xl'>❌</span>
          </div>
          <h2 className='mb-2 text-xl font-bold text-gray-900'>
            오류가 발생했습니다
          </h2>
          <p className='mb-4 text-gray-600'>잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => refresh()}
            className='px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700'
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
