import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBoardById from '../hooks/useBoardById';
import Loading from '../components/Loading';
import Error from '../components/Error';
import useStomp from '../hooks/useStomp';
import Pot from '../components/Pot';
import VictoryMessage from '../components/VictoryMessage';
import CommunityCards from '../components/CommunityCards';
import Player from '../components/Player';
import useAuthStore from '../stores/useAuthStore';
import {
  GAME_START,
  MAX_COMMUNITY_CARDS,
  MAX_PLAYER,
  SHOW_DOWN,
} from '../constants/boardConstants';

export default function Board() {
  const { boardId } = useParams();
  const {
    boardQuery: { data: board, isLoading, error },
  } = useBoardById(boardId);
  const [communityCards, setCommunityCards] = useState([]);
  const [mainPlayer, setMainPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const { subId, setSubId } = useAuthStore();
  const { connect, subscribe, disconnect, sendExitMessage, exitDisconnect } =
    useStomp();

  const [gameBoard, setGameBoard] = useState(null);
  const [winners, setWinners] = useState([]);
  const handleMessage = (message) => {
    const { messageType, data } = JSON.parse(message.body);

    console.log(messageType);
    if (messageType === SHOW_DOWN) {
      const winnerPlayerList = data.players
        .filter((player) => player.gameResult?.winner)
        .sort((a, b) => b.gameResult.handValue - a.gameResult.handValue);
      setWinners([...winnerPlayerList]);
    } else if (messageType === GAME_START) {
      setWinners([]);
    }

    setGameBoard(data);
    //console.log(data);
  };

  const onExit = () => {
    if (window.confirm('게임에서 나가시겠습니까?')) {
      sendExitMessage('/pub/board/exit', gameBoard, boardId);
      exitDisconnect();
      window.close();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      disconnect(subId);
      const message = '이 창을 닫으시면 변경 사항이 저장되지 않을 수 있습니다.';
      event.returnValue = message;
      return message;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!window.name) {
      return;
    }
    const { userId, password, subId } = JSON.parse(window.name);
    // 웹소켓 연결
    if (userId && password) {
      connect({ userId, password });
    }
    if (subId) {
      setSubId(Number(subId));
    }
  }, [setSubId]);

  useEffect(() => {
    if (board) {
      setGameBoard(board);
    }
    return () => {};
  }, [board]);

  const getPlayerPositions = (mainPlayerPosition) => {
    // 메인 플레이어 제외 플레이어 위치 배열 생성
    return Array.from(
      { length: MAX_PLAYER - 1 },
      (_, i) => (mainPlayerPosition + i + 1) % MAX_PLAYER
    );
  };

  useEffect(() => {
    // 커뮤니티 카드 번호 저장
    if (gameBoard) {
      const communityCards = [...Array(MAX_COMMUNITY_CARDS)].map(
        (_, i) => gameBoard[`communityCard${i + 1}`]
      );
      setCommunityCards(communityCards);
      const mainPlayer = gameBoard.players.find(
        (player) => player.userId === parseInt(subId)
      );
      setMainPlayer(mainPlayer);
    }

    // 나 제외한 플레이어 위치 찾기
    if (mainPlayer) {
      const updatedPlayerPositions = getPlayerPositions(mainPlayer.position);

      const updatedPlayers = updatedPlayerPositions.map((position) =>
        gameBoard.players.find((player) => player.position === position)
      );

      setPlayers(updatedPlayers);
    }

    return () => {};
  }, [gameBoard, mainPlayer]);

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
      <div className='flex items-center justify-between'>
        <p>{gameBoard.totalPlayer}/6</p>
        <button onClick={onExit}>나가기</button>
      </div>
      {winners?.length > 0 && <VictoryMessage winners={winners} />}

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
            <CommunityCards
              communityCards={communityCards}
              gameBoard={gameBoard}
            />
          )}
        </div>

        {/* 6명의 플레이어 배치 */}
        {/* 하단 플레이어 (메인) */}
        <div className='absolute bottom-0 transform -translate-x-1/2 left-1/2 translate-y-1/4'>
          {mainPlayer && (
            <Player
              subId={subId}
              player={mainPlayer}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>

        {/* 상단 플레이어 */}
        <div className='absolute top-0 transform -translate-x-1/2 left-1/2 -translate-y-1/4'>
          {players[2] && (
            <Player
              subId={subId}
              player={players[2]}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>

        {/* 좌측 상단 플레이어 */}
        <div className='absolute left-0 transform top-1/4 -translate-x-1/4'>
          {players[1] && (
            <Player
              subId={subId}
              player={players[1]}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>

        {/* 좌측 하단 플레이어 */}
        <div className='absolute left-0 transform bottom-1/4 -translate-x-1/4'>
          {players[0] && (
            <Player
              subId={subId}
              player={players[0]}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>

        {/* 우측 상단 플레이어 */}
        <div className='absolute right-0 transform top-1/4 translate-x-1/4'>
          {players[3] && (
            <Player
              subId={subId}
              player={players[3]}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>

        {/* 우측 하단 플레이어 */}
        <div className='absolute right-0 transform bottom-1/4 translate-x-1/4'>
          {players[4] && (
            <Player
              subId={subId}
              player={players[4]}
              gameBoard={gameBoard}
              setGameBoard={setGameBoard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
