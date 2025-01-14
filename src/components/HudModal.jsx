import React, { useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Loading from './Loading';
import Error from './Error';

const HudModal = ({ hudQuery, image, onClose }) => {
  const { data: hud, isLoading, error } = hudQuery;
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const {
    userName,
    vpip,
    pfr,
    threeBet,
    wtsd,
    wsd,
    totalHands,
    pfAggressiveCnt,
    wtf,
    cbet,
  } = hud;

  const stats = [
    {
      id: 'vpip',
      label: 'VPIP',
      description: '프리플랍에서 베팅하거나 콜하는 비율',
      color: 'rgb(239 68 68)', // Red
      value: totalHands === 0 ? 0 : (vpip / totalHands) * 100,
    },
    {
      id: 'pfr',
      label: 'PFR',
      description: '프리플랍에서 베팅 또는 레이즈하는 비율',
      color: 'rgb(34 197 94)', // Green
      value: totalHands === 0 ? 0 : (pfr / totalHands) * 100,
    },
    {
      id: 'cbet',
      label: 'CBET',
      description: '프리플랍에서 레이즈 또는 콜에 대한 응답',
      color: 'rgb(34 139 230)', // Blue
      value: pfAggressiveCnt === 0 ? 0 : (cbet / pfAggressiveCnt) * 100,
    },
    {
      id: '3bet',
      label: '3BET',
      description: '상대 베팅에 대한 리레이즈 비율',
      color: 'rgb(255 159 28)', // Orange
      value: wtf === 0 ? 0 : (threeBet / wtf) * 100,
    },
    {
      id: 'wtsd',
      label: 'WTSD',
      description: '리버에서 쇼다운 참여한 비율',
      color: 'rgb(138 43 226)', // Blue Violet
      value: wtf === 0 ? 0 : (wtsd / wtf) * 100,
    },
    {
      id: 'wsd',
      label: 'WSD',
      description: '쇼다운에서 이긴 비율',
      color: 'rgb(255 99 71)', // Tomato
      value: wtsd === 0 ? 0 : (wsd / wtsd) * 100,
    },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='w-[90%] max-w-[800px] p-8 bg-white rounded-lg shadow-lg overflow-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-5'>
            {image && (
              <img
                src={image}
                alt={userName}
                className='object-cover w-16 h-16 border-2 border-gray-300 rounded-full'
              />
            )}
            <div>
              <h2 className='text-2xl font-semibold text-gray-900'>
                {userName}
              </h2>
              <p className='text-sm text-gray-600'>Total Hands: {totalHands}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-700'
          >
            ✕
          </button>
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-3'>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className='relative flex items-center justify-center p-4 transition-all rounded-lg shadow-md bg-gray-50 hover:scale-105'
              onMouseEnter={() => setActiveTooltip(stat.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className='w-24 h-24'>
                <CircularProgressbarWithChildren
                  value={stat.value}
                  styles={{
                    path: {
                      stroke: stat.color,
                      strokeLinecap: 'round',
                    },
                    trail: {
                      stroke: '#e6e6e6',
                    },
                  }}
                >
                  <div className='text-center'>
                    <div className='text-xl font-semibold'>
                      {stat.value.toFixed(1)}%
                    </div>
                    <div className='text-xs text-gray-500'>{stat.label}</div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>

              {activeTooltip === stat.id && (
                <div className='absolute px-2 py-2 mb-2 text-xs text-white transform -translate-x-1/2 bg-gray-900 rounded-lg bottom-full left-1/2 whitespace-nowrap'>
                  {stat.description}
                  <div className='absolute bottom-0 w-2 h-2 transform rotate-45 -translate-x-1/2 translate-y-1/2 bg-gray-900 left-1/2'></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HudModal;
