import React, { useEffect, useState } from 'react';
import Pot from './Pot';
import CommunityCards from './CommunityCards';
import useAuthStore from '../stores/useAuthStore';
import { MAX_PLAYER } from '../constants/boardConstants';
import HandPlayer from './HandPlayer';

export default function HandTable({ handHistory }) {
  const { subId } = useAuthStore();

  const [players, setPlayers] = useState([]);
  const [mainPlayer, setMainPlayer] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const getPhaseStatus = (actionList) => {
    const phaseList = actionList.map((item) => item.phaseStatus);
    return Math.max(...phaseList);
  };

  const {
    communityCard1,
    communityCard2,
    communityCard3,
    communityCard4,
    communityCard5,
    userList,
    posList,
    cardList,
    btnPosition,
  } = handHistory;
  const communityCards = [
    communityCard1,
    communityCard2,
    communityCard3,
    communityCard4,
    communityCard5,
  ];

  const getPlayerPositions = (mainPlayerPosition) => {
    // 메인 플레이어 제외 플레이어 위치 배열 생성
    return Array.from(
      { length: MAX_PLAYER - 1 },
      (_, i) => (mainPlayerPosition + i + 1) % MAX_PLAYER
    );
  };
  useEffect(() => {
    if (userList && posList && cardList) {
      const players = userList.map((user, index) => ({
        ...user,
        position: posList[index],
        card1: cardList[index * 2],
        card2: cardList[index * 2 + 1],
      }));

      setPlayers(players);
    }
  }, [userList, posList, cardList]);

  useEffect(() => {
    if (players.length > 0) {
      const mainPlayer = players.find(
        (player) => player.id === parseInt(subId)
      );
      setMainPlayer(mainPlayer);
    }
    if (mainPlayer) {
      const updatedPlayerPositions = getPlayerPositions(mainPlayer.position);

      const updatedPlayers = updatedPlayerPositions.map((position) =>
        players.find((player) => player.position === position)
      );

      setOtherPlayers(updatedPlayers);
    }
  }, [players, mainPlayer]);

  return (
    <div className='flex items-center justify-center w-full h-full p-4'>
      <div
        className='relative w-[900px] h-[500px] rounded-[200px] 
        border-8 border-emerald-900/50 shadow-[0_0_100px_rgba(16,185,129,0.2)]
        bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600
        overflow-hidden transition-all duration-300'
      >
        <div className='absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent' />

        <div className='absolute flex flex-col items-center gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <Pot />
          <CommunityCards
            communityCards={communityCards}
            phaseStatus={getPhaseStatus(handHistory.actionList)}
          />
        </div>

        <div className='absolute bottom-0 transform -translate-x-1/2 left-1/2 translate-y-1/4'>
          {mainPlayer && (
            <HandPlayer subId={subId} player={mainPlayer} btn={btnPosition} />
          )}
        </div>

        {/* 상단 플레이어 */}
        <div className='absolute top-0 transform -translate-x-1/2 left-1/2 -translate-y-1/4'>
          {otherPlayers[2] && (
            <HandPlayer
              subId={subId}
              player={otherPlayers[2]}
              btn={btnPosition}
            />
          )}
        </div>

        {/* 좌측 상단 플레이어 */}
        <div className='absolute left-0 transform top-1/4 -translate-x-1/4'>
          {otherPlayers[1] && (
            <HandPlayer
              subId={subId}
              player={otherPlayers[1]}
              btn={btnPosition}
            />
          )}
        </div>

        {/* 좌측 하단 플레이어 */}
        <div className='absolute left-0 transform bottom-1/4 -translate-x-1/4'>
          {otherPlayers[0] && (
            <HandPlayer
              subId={subId}
              player={otherPlayers[0]}
              btn={btnPosition}
            />
          )}
        </div>

        {/* 우측 상단 플레이어 */}
        <div className='absolute right-0 transform top-1/4 translate-x-1/4'>
          {otherPlayers[3] && (
            <HandPlayer
              subId={subId}
              player={otherPlayers[3]}
              btn={btnPosition}
            />
          )}
        </div>

        {/* 우측 하단 플레이어 */}
        <div className='absolute right-0 transform bottom-1/4 translate-x-1/4'>
          {otherPlayers[4] && (
            <HandPlayer
              subId={subId}
              player={otherPlayers[4]}
              btn={btnPosition}
            />
          )}
        </div>
      </div>
    </div>
  );
}
