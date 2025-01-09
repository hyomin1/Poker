import React from 'react';
import Card from './Card';

export default function CommunityCards({ communityCards }) {
  //console.log(communityCards);

  return (
    <div className='flex gap-4'>
      {communityCards?.map((communityCard, i) => (
        <Card key={i} card={communityCard} />
      ))}
    </div>
  );
}
