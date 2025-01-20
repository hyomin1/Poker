import { render, screen } from '@testing-library/react';
import Card from '../Card';
import { CARDS_PER_SUIT, RANKS, SUITS } from '../../constants/cardConstant';

describe('Card', () => {
  const renderCard = (card, isJokBo = false) =>
    render(<Card card={card} isJokBo={isJokBo} />);
  it('카드이미지가 올바르게 렌더링된다.', () => {
    const cardNumber = 10; // 퀸
    const cardSuit = 2; // 하트
    const card = cardSuit * CARDS_PER_SUIT + cardNumber;

    renderCard(card);

    const cardImage = `/images/${RANKS.QUEEN}_of_${SUITS.HEART}.png`;
    const img = screen.getByRole('img', { name: `Card${card}` });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', cardImage);
  });

  it('족보에 해당하는 카드면 강조 효과가 적용된다.', () => {
    renderCard(5, true);
    const img = screen.getByRole('img', { name: `Card5` });

    expect(img).toHaveClass('scale-110');
  });
});
