import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function CommunityCards({ communityCards, gameBoard, winners }) {
  const { phaseStatus } = gameBoard;

  const jokBo = phaseStatus === 6 ? winners[0].gameResult.jokBo : [];
  return (
    <div className='flex gap-4'>
      {phaseStatus >= 2 ? (
        <>
          <Card
            card={communityCards[0]}
            isJokBo={jokBo.includes(communityCards[0])}
          />
          <Card
            card={communityCards[1]}
            isJokBo={jokBo.includes(communityCards[1])}
          />
          <Card
            card={communityCards[2]}
            isJokBo={jokBo.includes(communityCards[2])}
          />
        </>
      ) : (
        [1, 2, 3].map((number) => <CardBack key={number} />)
      )}
      {phaseStatus >= 3 ? (
        <Card
          card={communityCards[3]}
          isJokBo={jokBo.includes(communityCards[3])}
        />
      ) : (
        <CardBack />
      )}
      {phaseStatus >= 4 ? (
        <Card
          card={communityCards[4]}
          isJokBo={jokBo.includes(communityCards[4])}
        />
      ) : (
        <CardBack />
      )}
    </div>
  );
}
