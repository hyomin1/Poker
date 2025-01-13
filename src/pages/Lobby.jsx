import useBoard from '../hooks/useBoard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Rooms from '../components/Rooms';

import { Link } from 'react-router-dom';

export default function Lobby() {
  const { boardQueries, quickJoinMutation, enterGameMutation } = useBoard();

  return (
    <div className='min-h-screen p-6 text-white bg-gray-900'>
      <div className='mx-auto max-w-7xl'>
        <div>
          <h1 className='mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text'>
            포커 로비
          </h1>
          <Link to={'/handHistory'}>핸드히스토리</Link>
        </div>

        <div className='grid grid-cols-2 gap-6 h-[calc(100vh-160px)]'>
          {boardQueries.map(
            ({ data: boards, isLoading, error, refetch }, index) => (
              <div
                key={index}
                className='overflow-hidden bg-gray-800 rounded-lg shadow-lg'
              >
                {isLoading && <Loading />}
                {error && <Error />}
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
