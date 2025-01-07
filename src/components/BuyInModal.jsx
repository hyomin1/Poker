import React, { useState } from 'react';

export function BuyInModal({
  isOpen,
  onClose,
  onConfirm,
  defaultBB = 50,
  title = '바이인 설정',
}) {
  const [bb, setBB] = useState(defaultBB);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='z-10 w-full max-w-sm p-6 bg-gray-800 shadow-xl rounded-xl'>
        <h3 className='mb-6 text-xl font-semibold text-white'>{title}</h3>

        <div className='space-y-6'>
          <div className='w-full space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-gray-300'>바이인</span>
              <span className='px-2 py-1 text-sm font-semibold text-purple-400 bg-gray-700 rounded'>
                {bb} BB
              </span>
            </div>

            <div className='relative'>
              <input
                type='range'
                min='50'
                max='100'
                value={bb}
                onChange={(e) => setBB(Number(e.target.value))}
                className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-purple-500
                  [&::-webkit-slider-thumb]:to-blue-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:hover:scale-110'
              />

              <div className='absolute flex justify-between w-full mt-1 text-xs text-gray-400'>
                <span>50 BB</span>
                <span>100 BB</span>
              </div>
            </div>
          </div>

          <div className='flex space-x-4'>
            <button
              onClick={onClose}
              className='flex-1 px-4 py-2 text-white transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600'
            >
              취소
            </button>
            <button
              onClick={() => onConfirm(bb)}
              className='flex-1 px-4 py-2 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
