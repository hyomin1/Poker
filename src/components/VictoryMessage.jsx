import React from 'react';

export default function VictoryMessage({ winners }) {
  console.log(winners);

  return (
    <div className='max-w-2xl p-4 mx-auto space-y-4'>
      <h2 className='flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-center'>
        게임 결과
      </h2>

      <div className='grid gap-4'>
        {winners.map((winner) => (
          <div
            key={winner.userId}
            className='overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg'
          >
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  {/* 플레이어 이름 */}
                  <h3 className='text-xl font-semibold text-blue-600'>
                    {winner.playerName}
                  </h3>

                  {/* 핸드 콘텍스트 */}
                  <p className='font-medium text-gray-600'>
                    {winner.gameResult.handContext}
                  </p>
                </div>

                {/* 획득 금액 */}
                <div className='flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full'>
                  <span className='font-bold text-green-700'>
                    {typeof winner.gameResult.earnedMoney === 'number'
                      ? winner.gameResult.earnedMoney.toLocaleString()
                      : winner.gameResult.earnedMoney}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
