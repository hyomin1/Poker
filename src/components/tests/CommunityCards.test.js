import { render, screen } from '@testing-library/react';
import CommunityCards from '../CommunityCards';

describe('CommunityCards', () => {
  const mockCards = [1, 2, 3, 4, 5];
  const mockWinners = [
    {
      gameResult: {
        jokBo: [2, 4],
      },
    },
  ];

  const renderCommunityCards = (phaseStatus) =>
    render(
      <CommunityCards
        communityCards={mockCards}
        phaseStatus={phaseStatus}
        winners={mockWinners}
      />
    );

  it('phaseStatus가 2 이상일때 카드가 렌더링된다.', () => {
    renderCommunityCards(2);

    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(5);
  });

  it('phaseStatus가 3 이상일때 4번째 카드가 렌더링된다.', () => {
    renderCommunityCards(3);

    const card4 = screen.getByAltText('Card4');
    expect(card4).toBeInTheDocument();
  });

  it('phaseStatus가 4 이상일때 5번째 카드가 렌더링된다.', () => {
    renderCommunityCards(4);

    const card5 = screen.getByAltText('Card5');
    expect(card5).toBeInTheDocument();
  });

  it('phaseStatus가 2 미만일때 카드 뒷면이 렌더링 된다.', () => {
    renderCommunityCards(1);

    const cardBacks = screen.getAllByAltText('cardBack');
    expect(cardBacks).toHaveLength(5);
  });

  it('족보에 해당하는 카드는 isJokBo prop이 true로 설정된다.', () => {
    renderCommunityCards(6);
    const card2 = screen.getByAltText('Card2');
    expect(card2).toHaveClass('scale-110');

    const card4 = screen.getByAltText('Card4');
    expect(card4).toHaveClass('scale-110');
  });
});
