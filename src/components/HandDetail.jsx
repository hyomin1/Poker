import React from 'react';
import { POSITIONS } from '../constants/boardConstants';

export default function HandDetail({ handHistory }) {
  const {
    potAmountPF,
    potAmountFlop,
    potAmountTurn,
    potAmountRiver,
    actionList,
    btnPosition,
  } = handHistory;

  const getPosition = (position) => {
    const index = (position - btnPosition + 6) % 6;
    return POSITIONS[index];
  };

  const PhaseHeader = ({ phase, amount }) => (
    <div className='flex items-center justify-between pb-2 mb-3 border-b border-gray-700'>
      <h3 className='text-lg font-semibold text-white'>{phase}</h3>
      {amount !== 0 && (
        <span className='px-3 py-1 text-sm font-medium border rounded-full text-emerald-400 bg-emerald-900/20 border-emerald-500/20'>
          {amount}BB
        </span>
      )}
    </div>
  );
  const ActionItem = ({ position, detail }) => (
    <div className='flex items-center gap-3 px-3 py-2 transition-colors duration-200 rounded-lg bg-gray-800/40 hover:bg-gray-800/60'>
      <span className='px-2 py-1 text-sm font-medium text-white rounded-md bg-gray-700/50'>
        {position}
      </span>
      <span className='text-gray-300'>{detail}</span>
    </div>
  );

  return (
    <div className='p-4 space-y-6'>
      <div className='space-y-4'>
        <PhaseHeader phase='프리플랍' amount={potAmountPF} />
        <div className='space-y-2'>
          {actionList
            .filter((action) => action.phaseStatus === 1)
            .map((action) => (
              <ActionItem
                key={action.no}
                position={getPosition(action.actPosition)}
                detail={action.detail}
              />
            ))}
        </div>
      </div>

      <div className='space-y-4'>
        <PhaseHeader phase='플랍' amount={potAmountFlop} />
        <div className='space-y-2'>
          {actionList
            .filter((action) => action.phaseStatus === 2)
            .map((action) => (
              <ActionItem
                key={action.no}
                position={getPosition(action.actPosition)}
                detail={action.detail}
              />
            ))}
        </div>
      </div>

      <div className='space-y-4'>
        <PhaseHeader phase='턴' amount={potAmountTurn} />
        <div className='space-y-2'>
          {actionList
            .filter((action) => action.phaseStatus === 3)
            .map((action) => (
              <ActionItem
                key={action.no}
                position={getPosition(action.actPosition)}
                detail={action.detail}
              />
            ))}
        </div>
      </div>

      <div className='space-y-4'>
        <PhaseHeader phase='리버' amount={potAmountRiver} />
        <div className='space-y-2'>
          {actionList
            .filter((action) => action.phaseStatus === 4)
            .map((action) => (
              <ActionItem
                key={action.no}
                position={getPosition(action.actPosition)}
                detail={action.detail}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
