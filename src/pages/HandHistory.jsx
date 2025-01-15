import React from 'react';
import useHandHistory from '../hooks/useHandHistory';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Carousel from 'react-bootstrap/Carousel';
import HandTable from '../components/HandTable';
import HandDetail from '../components/HandDetail';

export default function HandHistory() {
  const {
    handHistoryQuery: { isLoading, error, data: handHistories },
  } = useHandHistory();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className='flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 md:p-8'>
      <div className='w-full space-y-8 max-w-7xl'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 md:text-5xl'>
            핸드 히스토리
          </h1>
          <p className='text-gray-400'>게임 진행 내역을 확인하세요</p>
        </div>

        <div className='relative rounded-3xl bg-gray-800/30 p-4 backdrop-blur-lg ring-1 ring-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] md:p-6'>
          <Carousel
            className='w-full overflow-hidden rounded-2xl'
            indicators={true}
            controls={true}
            interval={null}
          >
            {handHistories.map((handHistory) => (
              <Carousel.Item
                key={handHistory.id}
                className='h-full p-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90'
              >
                <div className='flex flex-col max-w-5xl mx-auto'>
                  <div className='aspect-[21/9] max-h-[400px]'>
                    <HandTable handHistory={handHistory} />
                  </div>

                  <div className='p-6 mt-8 transition-all duration-300 shadow-lg rounded-2xl bg-gray-800/40 backdrop-blur-sm ring-1 ring-white/10 hover:ring-emerald-500/30'>
                    <HandDetail handHistory={handHistory} />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className='absolute w-1/2 -translate-x-1/2 -bottom-2 left-1/2 h-1/2 blur-3xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20' />
        </div>
      </div>
    </div>
  );
}
