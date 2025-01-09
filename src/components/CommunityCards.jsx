import React from 'react';
import Card from './Card';

export default function CommunityCards({ communityCards, gameBoard }) {
  //console.log(communityCards);
  const { phaseStatus } = gameBoard;
  return (
    <div className='flex gap-4'>
      {phaseStatus >= 2 && (
        <>
          <Card card={communityCards[0]} />
          <Card card={communityCards[1]} />
          <Card card={communityCards[2]} />
        </>
      )}
      {phaseStatus >= 3 && <Card card={communityCards[3]} />}
      {phaseStatus >= 4 && <Card card={communityCards[4]} />}
    </div>
  );
}
