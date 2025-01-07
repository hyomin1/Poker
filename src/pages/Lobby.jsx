import React, { useEffect } from 'react';
import useBoard from '../hooks/useBoard';
import Boards from '../components/Boards';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { createStompClient, stompClient } from '../api/stompClient';
import useAuthStore from '../stores/useAuthStroe';

export default function Lobby() {
  const { boardQueries, quickJoinMutation, enterGameMutation } = useBoard();
  const { userId, password } = useAuthStore();
  // console.log(boardQueries[0].data);

  // 쿼리 Loading, Error 처리
  useEffect(() => {
    const stompClient = createStompClient({ userId, password });
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);
  return (
    <div>
      로비
      {boardQueries.map(
        ({ data: boards, isLoading, error, refetch }, index) => (
          <div key={index}>
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
  );
}
