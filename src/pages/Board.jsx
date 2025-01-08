import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStompStore from '../stores/useStompStore';
import useBoardById from '../hooks/useBoardById';
import Loading from '../components/Loading';
import Error from '../components/Error';
import useStomp from '../hooks/useStomp';

export default function Board() {
  const { boardId } = useParams();
  const {
    boardQuery: { data: board, isLoading, error },
  } = useBoardById(boardId);

  const { connect, subscribe, isConnected } = useStomp();
  console.log(board);

  useEffect(() => {
    // 웹소켓 연결결
    if (window.name) {
      const { userId, password } = JSON.parse(window.name);
      if (userId && password) {
        connect({ userId, password });
      }
    }
  }, []);

  useEffect(() => {
    if (boardId && isConnected()) {
      subscribe(`/topic/board/${boardId}`, (message) => {
        console.log('re', message);
      });
      // subscribe()
    }
    return () => {};
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <div>보드</div>;
}
