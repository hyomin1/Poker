import useBoard from '../hooks/useBoard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Rooms from '../components/Rooms';
import { useEffect } from 'react';
import useAuthStore from '../stores/useAuthStroe';

export default function Lobby() {
  const { userId, password, subId } = useAuthStore();

  const {
    boardQueries,
    boardContextQuery: { isLoading, error, data: boardContext },
    quickJoinMutation,
    enterGameMutation,
  } = useBoard();

  useEffect(() => {
    if (boardContext?.length > 0) {
      boardContext.forEach((board) => {
        const url = `/board/${board.id}`;
        const game = window.open('about:blank', '_blank');
        if (game) {
          game.name = JSON.stringify({ userId, password, subId });
          game.location = url;
        }
      });
    }
  }, [boardContext]);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    <Error />;
  }
  return (
    <div className='min-h-screen p-6 text-white bg-gray-900'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text'>
          포커 로비
        </h1>
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
