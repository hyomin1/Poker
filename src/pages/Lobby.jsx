import useBoard from '../hooks/useBoard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Rooms from '../components/Rooms';
import { Link } from 'react-router-dom';

export default function Lobby() {
  const { boardQueries, quickJoinMutation, enterGameMutation } = useBoard();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
      {/* Background Decoration */}
      <div className='absolute inset-0 opacity-5' />

      <div className='relative px-6 py-8'>
        <div className='mx-auto space-y-8 max-w-7xl'>
          {/* Header Section */}
          <div className='space-y-6 text-center'>
            <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500'>
              포커 로비
            </h1>

            {/* Navigation Links */}
            <div className='flex justify-center gap-4'>
              <Link
                to='/handHistory'
                className='px-6 py-2.5 rounded-xl font-medium text-white
                  bg-gradient-to-r from-emerald-500 to-blue-500
                  hover:from-emerald-600 hover:to-blue-600
                  transform transition-all duration-300 hover:scale-105
                  shadow-lg hover:shadow-emerald-500/25
                  ring-1 ring-white/10 hover:ring-emerald-500/50 no-underline'
              >
                핸드히스토리
              </Link>

              <Link
                to='/dashboard'
                className='px-6 py-2.5 rounded-xl font-medium text-white
                  bg-gradient-to-r from-blue-500 to-purple-500
                  hover:from-blue-600 hover:to-purple-600
                  transform transition-all duration-300 hover:scale-105
                  shadow-lg hover:shadow-blue-500/25
                  ring-1 ring-white/10 hover:ring-blue-500/50 no-underline'
              >
                프로필
              </Link>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]'>
            {boardQueries.map(
              ({ data: boards, isLoading, error, refetch }, index) => (
                <div
                  key={index}
                  className='relative overflow-hidden transition-all duration-300 group rounded-2xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 hover:ring-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10'
                >
                  {/* Ambient Light Effect */}
                  <div className='absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-emerald-500/5 to-transparent group-hover:opacity-100' />

                  {/* Content */}
                  <div className='relative h-full'>
                    {isLoading && (
                      <div className='flex items-center justify-center h-full'>
                        <Loading />
                      </div>
                    )}
                    {error && (
                      <div className='flex items-center justify-center h-full'>
                        <Error />
                      </div>
                    )}
                    {boards && (
                      <Rooms
                        key={index}
                        blindIndex={index}
                        boards={boards}
                        refetch={refetch}
                        quickJoinMutation={quickJoinMutation}
                        enterGameMutation={enterGameMutation}
                      />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
