import React, { useEffect } from 'react';
import useBoard from '../hooks/useBoard';
import Boards from '../components/Boards';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { createStompClient } from '../api/stompClient';
import useAuthStore from '../stores/useAuthStroe';

export default function Lobby() {
  const { boardQueries, quickJoinMutation, enterGameMutation } = useBoard();
  const { userId, password } = useAuthStore();

  // 쿼리 Loading, Error 처리
  useEffect(() => {
    const stompClient = createStompClient({ userId, password });
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);
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
                  <Boards
                    key={index}
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
