import React from 'react';
import useHandHistory from '../hooks/useHandHistory';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function HandHistory() {
  const {
    handHistoryQuery: { isLoading, error, data: handHistory },
  } = useHandHistory();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const getCardSymbol = (cardNum) => {
    const suit = Math.floor(cardNum / 13);
    const rank = cardNum % 13;
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];
    return `${ranks[rank]}${suits[suit]}`;
  };

  const formatMoney = (amount) => {
    return `$${(amount / 1000).toFixed(2)}k`;
  };

  // Generate positions for 6 seats around the table
  const seatPositions = [
    'top-1/4 left-1/2 -translate-x-1/2', // Top
    'top-1/2 left-[85%] -translate-x-1/2', // Top Right
    'bottom-1/4 left-[85%] -translate-x-1/2', // Bottom Right
    'bottom-1/4 left-1/2 -translate-x-1/2', // Bottom
    'bottom-1/2 left-[15%] -translate-x-1/2', // Bottom Left
    'top-1/4 left-[15%] -translate-x-1/2', // Top Left
  ];

  return (
    <div className='p-4'>
      <div className='max-w-4xl mx-auto'>
        {handHistory?.map((hand) => (
          <div key={hand.id} className='mb-8'>
            <div className='mb-4 text-lg font-bold'>Hand #{hand.id}</div>
            <div className='relative mb-4 h-96'>
              {/* Poker Table */}
              <div className='absolute inset-0 m-auto w-[90%] h-[80%] bg-green-700 rounded-[50%] border-8 border-brown-800'>
                {/* Center Info - Community Cards & Pot */}
                <div className='absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                  <div className='flex justify-center gap-2 mb-2'>
                    {[
                      hand.communityCard1,
                      hand.communityCard2,
                      hand.communityCard3,
                      hand.communityCard4,
                      hand.communityCard5,
                    ].map((card, i) => (
                      <span
                        key={i}
                        className={`text-xl px-2 py-1 bg-white rounded ${
                          Math.floor(card / 13) === 2 ||
                          Math.floor(card / 13) === 3
                            ? 'text-red-600'
                            : 'text-gray-800'
                        }`}
                      >
                        {getCardSymbol(card)}
                      </span>
                    ))}
                  </div>
                  <div className='font-bold text-white'>
                    Pot: ${hand.potAmountRiver}
                  </div>
                </div>

                {/* Players */}
                {hand.userList.map((user, index) => {
                  const position = hand.posList[index];
                  return (
                    <div
                      key={user.id}
                      className={`absolute ${seatPositions[position]} transform text-center`}
                    >
                      <div className='p-2 mb-2 text-white bg-gray-800 rounded-lg'>
                        <div>{user.userName}</div>
                        <div className='text-sm'>{formatMoney(user.money)}</div>
                      </div>
                      {/* Player Cards */}
                      <div className='flex justify-center gap-1'>
                        {hand.cardList
                          .slice(index * 2, index * 2 + 2)
                          .map((card, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 bg-white rounded ${
                                Math.floor(card / 13) === 2 ||
                                Math.floor(card / 13) === 3
                                  ? 'text-red-600'
                                  : 'text-gray-800'
                              }`}
                            >
                              {getCardSymbol(card)}
                            </span>
                          ))}
                      </div>
                      {position === hand.btnPosition && (
                        <div className='inline-block px-2 mt-1 text-sm bg-white rounded-full'>
                          BTN
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions List */}
            <div className='p-4 bg-gray-100 rounded'>
              <div className='space-y-1 text-sm'>
                {hand.actionList.map((action) => (
                  <div key={action.id}>
                    <span className='font-medium'>
                      {
                        ['Preflop', 'Flop', 'Turn', 'River'][
                          action.phaseStatus - 1
                        ]
                      }
                      :
                    </span>{' '}
                    Player {action.userId} - {action.detail}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
