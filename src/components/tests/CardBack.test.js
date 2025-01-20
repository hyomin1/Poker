import { render, screen } from '@testing-library/react';
import CardBack from '../CardBack';

describe('CardBack', () => {
  const renderCardBack = () => render(<CardBack />);

  it('카드 뒷면이 렌더링 된다.', () => {
    renderCardBack();
    const img = screen.getByRole('img', { name: 'cardBack' });
    expect(img).toBeInTheDocument();
  });

  it('카드 뒷면 이미지가 올바른 경로를 가진다.', () => {
    renderCardBack();
    const img = screen.getByRole('img', { name: 'cardBack' });
    const imgUrl = '/images/cardBack.jpg';
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
