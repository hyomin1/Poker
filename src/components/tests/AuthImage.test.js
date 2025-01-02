import { render, screen } from '@testing-library/react';
import AuthImage from '../AuthImage';

describe('AuthImage', () => {
  const renderAuthImage = () => render(<AuthImage />);
  it('로그인 화면의 이미지가 렌더링된다.', () => {
    const { asFragment } = renderAuthImage();
    expect(asFragment()).toMatchSnapshot();
  });

  it('이미지가 렌더링된다.', () => {
    renderAuthImage();
    const image = screen.getByAltText('bgImage');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/pokerBg.png');
  });

  it('h1 제목이 렌더링 된다.', () => {
    renderAuthImage();
    const title = screen.getByText("Let's Play Poker");
    expect(title).toBeInTheDocument();
  });
});
