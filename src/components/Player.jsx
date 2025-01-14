import React, { useEffect, useState } from 'react';
import Card from './Card';
import DealerButton from './DealerButton';
import ActionButton from './ActionButton';
import Chip from './Chip';
import useStomp from '../hooks/useStomp';
import {
  CHECK,
  FOLD,
  CALL,
  RAISE,
  ALL_IN_RAISE,
  ALL_IN_CALL,
  TIME,
} from '../constants/boardConstants';
import CardBack from './CardBack';
import HudModal from './HudModal';
import useHud from '../hooks/useHud';
import { createPortal } from 'react-dom';

export default function Player({
  subId,
  player,
  gameBoard,
  setGameBoard,
  winners,
}) {
  const { sendMessage } = useStomp();
  const [amount, setAmount] = useState(0);
  const [timer, setTimer] = useState(TIME);

  const { position, userId, phaseCallSize, money, id, status } = player;
  const { btn, actionPos, phaseStatus, blind, bettingSize, lastActionTime } =
    gameBoard;
  const jokBo = phaseStatus === 6 ? winners[0].gameResult.jokBo : [];

  const isPlaying = phaseStatus >= 1 && phaseStatus <= 4; // 게임중인지 확인
  const isDealer = position === btn; // 딜러 포지션
  const isMyCard = subId === userId && isPlaying; // 내 카드
  const isAction = position === actionPos && subId === userId; // 현재 배팅 턴
  const isTimer = position === actionPos && isPlaying;
  const chip = (phaseCallSize / blind).toFixed(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { hudQuery } = useHud(userId);

  const isPhase = phaseStatus !== 0;
  const checkRaise = isPhase && bettingSize === phaseCallSize;
  const foldAllIn =
    isPhase &&
    phaseCallSize < bettingSize &&
    money <= bettingSize - phaseCallSize;

  useEffect(() => {
    if (bettingSize === 0) {
      setAmount(blind);
    } else {
      setAmount(bettingSize * 2);
    }
  }, [blind, bettingSize]);

  useEffect(() => {
    if (!lastActionTime) {
      return;
    }
    const lastActionDate = new Date(lastActionTime);
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - lastActionDate) / 1000); // 경과된 시간 계산
    const remainingTime = Math.max(TIME - elapsedTime, 0); // 남은 시간 계산
    setTimer(remainingTime);
  }, [lastActionTime]);

  useEffect(() => {
    // 타이머
    let intervalId;
    if (isTimer && isPlaying) {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            fold();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimer(TIME);
    }
    return () => clearInterval(intervalId);
  }, [isTimer, isPlaying]);

  const onChangeAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const publishMessage = (board, option) => {
    const destination = `/pub/board/action/${option}`;
    sendMessage(destination, board, id);
  };

  const updatePlayerState = (newState) => {
    return {
      ...gameBoard,
      players: gameBoard.players.map((player) =>
        player.id === id ? { ...player, ...newState } : player
      ),
    };
  };
  const check = () => {
    if (bettingSize === phaseCallSize) {
      publishMessage(gameBoard, CHECK);
    }
  };

  const call = () => {
    const callAmount = bettingSize - phaseCallSize;
    if (callAmount > money) {
      return;
    }
    const updatedBoard = updatePlayerState({
      money: money - callAmount,
      phaseCallSize: bettingSize,
    });
    setGameBoard(updatedBoard);
    publishMessage(updatedBoard, CALL);
  };

  const fold = () => {
    if (bettingSize === 0) {
      return;
    }
    const updatedBoard = updatePlayerState({ status: 3 });
    setGameBoard(updatedBoard);
    publishMessage(updatedBoard, FOLD);
  };

  const raise = () => {
    if (money - phaseCallSize > bettingSize * 2) {
      setGameBoard((prev) => {
        const updatedPlayers = prev.players.map((player) =>
          player.id === id
            ? {
                ...player,
                status: amount === money + phaseCallSize ? 4 : player.status,
                money: player.money - (amount - phaseCallSize),
                phaseCallSize: amount,
              }
            : player
        );

        const updatedBoard = {
          ...prev,
          players: updatedPlayers,
          bettingPos: position,
          bettingSize: amount,
        };

        publishMessage(
          updatedBoard,
          amount === money + phaseCallSize ? ALL_IN_RAISE : RAISE
        );
        return updatedBoard;
      });
    }
  };

  const allIn = () => {
    if (bettingSize - phaseCallSize >= money) {
      setGameBoard((prev) => {
        const updatedPlayers = prev.players.map((player) =>
          player.id === id
            ? {
                ...player,
                status: 4,
                money: 0,
                phaseCallSize: money + phaseCallSize,
              }
            : player
        );
        const updatedBoard = {
          ...prev,
          players: updatedPlayers,
        };
        publishMessage(updatedBoard, ALL_IN_CALL);

        return updatedBoard;
      });
    }
  };
  const calculateProgress = () => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = (timer / TIME) * circumference;
    return circumference - progress;
  };

  return (
    <div className='relative flex flex-col items-center gap-2'>
      {/* 플레이어 정보 영역 */}
      <div className='flex flex-col items-center gap-2'>
        {/* 아바타와 칩 */}
        <div className='relative '>
          {isTimer && isPlaying && (
            <svg className='absolute -top-1 -left-1' width='84' height='84'>
              <circle
                cx='42'
                cy='42'
                r='40'
                fill='none'
                stroke='#ddd'
                strokeWidth='4'
              />
              <circle
                cx='42'
                cy='42'
                r='40'
                fill='none'
                stroke={timer <= 5 ? '#ef4444' : '#3b82f6'}
                strokeWidth='4'
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={calculateProgress()}
                transform='rotate(-90 42 42)'
                className='transition-all duration-1000 ease-linear'
              />
            </svg>
          )}
          <div
            onClick={() => setIsModalOpen(true)}
            className='flex items-center justify-center w-20 h-20 bg-gray-700 rounded-full shadow-lg'
          >
            <div className='w-16 h-16 bg-gray-600 border-2 border-gray-500 rounded-full' />
          </div>
          {isTimer && (
            <div className='absolute transform -translate-x-1/2 -top-8 left-1/2'>
              <span
                className={`font-bold ${
                  timer <= 5 ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {timer}s
              </span>
            </div>
          )}
          {/* 칩 표시 - 아바타 우측 상단에 위치 */}
          {isPlaying && (
            <div className='absolute -top-2 -right-4'>
              <Chip amount={chip} />
            </div>
          )}
        </div>

        {/* 플레이어 이름 */}
        <div className='absolute w-full text-center -bottom-6'>
          <span className='px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded-full'>
            {player.playerName}
          </span>
        </div>
      </div>

      {/* 카드 영역 (내 카드) */}
      {isMyCard && status !== 3 && phaseStatus !== 6 && (
        <div className='flex gap-2 mt-2'>
          <Card card={player.card1} />
          <Card card={player.card2} />
        </div>
      )}

      {/* 카드 영역 (상대 카드) */}
      {!isMyCard && status !== 3 && phaseStatus !== 6 && (
        <div className='flex gap-2 mt-2'>
          <CardBack card={player.card1} />
          <CardBack card={player.card2} />
        </div>
      )}
      {/* 카드 영역 (카드 결과 공개) */}
      {status !== 3 && phaseStatus === 6 && (
        <div className='flex gap-2 mt-2'>
          <Card card={player.card1} isJokBo={jokBo.includes(player.card1)} />
          <Card card={player.card2} isJokBo={jokBo.includes(player.card2)} />
        </div>
      )}

      {/* 딜러 버튼 */}
      {isDealer && (
        <div className='absolute bottom-0 -right-12'>
          <DealerButton />
        </div>
      )}

      {/* 액션 버튼 */}
      {isAction && isPlaying && (
        <div className='absolute bottom-0 flex gap-4 p-6 mt-4 transform -translate-x-1/2 translate-y-full bg-black left-1/2 bg-opacity-30 rounded-xl backdrop-blur-sm'>
          {checkRaise && (
            <>
              <ActionButton onClick={check} label='체크' />
              <ActionButton
                onClick={raise}
                label={amount === money ? '올인' : '레이즈'}
              />
              <input
                onChange={onChangeAmount}
                min={bettingSize === 0 ? blind : bettingSize * 2}
                max={money + phaseCallSize}
                value={amount}
                type='range'
                step={100}
              />
            </>
          )}
          {foldAllIn && (
            <>
              <ActionButton onClick={fold} label='폴드' />
              <ActionButton onClick={allIn} label='올인' />
            </>
          )}
          {!checkRaise && !foldAllIn && (
            <>
              <ActionButton onClick={fold} label='폴드' />
              <ActionButton onClick={call} label='콜' />
              <ActionButton
                onClick={raise}
                label={amount === money + phaseCallSize ? '올인' : '레이즈'}
              />
              <input
                onChange={onChangeAmount}
                min={bettingSize === 0 ? blind : bettingSize * 2}
                max={money + phaseCallSize}
                value={amount}
                type='range'
                step={100}
              />
            </>
          )}
        </div>
      )}

      {isModalOpen &&
        createPortal(
          <HudModal
            onClose={() => setIsModalOpen(false)}
            hudQuery={hudQuery}
          />,
          document.body
        )}
    </div>
  );
}
