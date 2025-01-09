import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStompStore from '../stores/useStompStore';
import useBoardById from '../hooks/useBoardById';
import Loading from '../components/Loading';
import Error from '../components/Error';
import useStomp from '../hooks/useStomp';
import Pot from '../components/Pot';
import CommunityCards from '../components/CommunityCards';
import Player from '../components/Player';
import DealerButton from '../components/DealerButton';
import ActionButton from '../components/ActionButton';
import useAuthStore from '../stores/useAuthStroe';

export default function Board() {
  const { boardId } = useParams();
  const {
    boardQuery: { data: board, isLoading, error },
  } = useBoardById(boardId);
  const [communityCards, setCommunityCards] = useState([]);
  const { subId, setSubId } = useAuthStore();
  const { connect, subscribe } = useStomp();
  console.log(board);

  const [gameBoard, setGameBoard] = useState(null);

  const handleMessage = (message) => {
    const { messageType, data } = JSON.parse(message.body);

    setGameBoard(data);
    console.log(data);
  };

  const findMainPlayer = () => {
    if (!gameBoard) return;

    return gameBoard.players.find(
      (player) => player.userId === parseInt(subId)
    );
  };
  const mainPlayer = findMainPlayer();

  useEffect(() => {
    // 웹소켓 연결
    if (!window.name) {
      return;
    }
    const { userId, password, subId } = JSON.parse(window.name);

    if (userId && password) {
      connect({ userId, password });
    }
    if (subId) {
      setSubId(subId);
    }
  }, [setSubId]);

  useEffect(() => {
    if (board) {
      setGameBoard(board);
    }
    return () => {};
  }, [board]);

  useEffect(() => {
    // 커뮤니티 카드 번호 저장
    if (gameBoard) {
      const communityCards = [...Array(5)].map(
        (_, i) => gameBoard[`communityCard${i + 1}`]
      );
      setCommunityCards(communityCards);
    }

    return () => {};
  }, [gameBoard]);

  useEffect(() => {
    if (boardId && subId) {
      subscribe([
        {
          url: `/topic/board/${boardId}`,
          callback: handleMessage,
          player_id: subId,
        },
        {
          url: `/queue/${subId}`,
          callback: (message) => {},
          player_id: subId,
        },
        {
          url: `/queue/error/${boardId}`,
          callback: (message) => {},
          player_id: subId,
        },
      ]);
    }
    return () => {};
  }, [subscribe, boardId, subId]);

  if (isLoading || !gameBoard) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className='relative w-full h-screen overflow-hidden bg-gradient-to-b from-green-800 to-green-900'>
      {/* 메인 테이블 */}
      {gameBoard.phaseStatus === 0 && <p>대기중</p>}
      <p>{gameBoard.totalPlayer}/6</p>
      <div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[900px] h-[500px] bg-green-600 rounded-[200px] 
                    border-8 border-brown-900 shadow-2xl
                    bg-gradient-to-br from-green-500 to-green-700'
      >
        {/* 중앙 영역 */}
        <div className='absolute flex flex-col items-center gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <Pot />
          {gameBoard.phaseStatus > 0 && (
            <CommunityCards communityCards={communityCards} />
          )}
        </div>

        {/* 6명의 플레이어 배치 */}
        {/* 하단 플레이어 (메인) */}
        <div className='absolute bottom-0 transform -translate-x-1/2 left-1/2 translate-y-1/4'>
          {mainPlayer && (
            <Player subId={subId} player={mainPlayer} gameBoard={gameBoard} />
          )}
        </div>

        {/* 상단 플레이어 */}
        {/* <div className='absolute top-0 transform -translate-x-1/2 left-1/2 -translate-y-1/4'>
          <Player />
        </div> */}

        {/* 좌측 상단 플레이어 */}
        {/* <div className='absolute left-0 transform top-1/4 -translate-x-1/4'>
          <Player />
        </div> */}

        {/* 좌측 하단 플레이어 */}
        {/* <div className='absolute left-0 transform bottom-1/4 -translate-x-1/4'>
          <Player />
        </div> */}

        {/* 우측 상단 플레이어 */}
        {/* <div className='absolute right-0 transform top-1/4 translate-x-1/4'>
          <Player />
        </div> */}

        {/* 우측 하단 플레이어 */}
        {/* <div className='absolute right-0 transform bottom-1/4 translate-x-1/4'>
          <Player />
        </div> */}

        {/* 딜러 버튼 */}
        {/* <div className='absolute bottom-20 right-32'>
          <DealerButton />
        </div> */}
      </div>

      {/* 하단 액션 버튼 */}
      {/* <div className='absolute flex gap-4 p-6 transform -translate-x-1/2 bg-black bottom-8 left-1/2 bg-opacity-30 rounded-xl backdrop-blur-sm'>
        <ActionButton label='FOLD' />
        <ActionButton label='CHECK' />
        <ActionButton label='CALL' />
        <ActionButton label='RAISE' />
      </div> */}
    </div>
  );
}
