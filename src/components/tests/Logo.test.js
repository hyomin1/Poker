import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo', () => {
  const renderLogo = () => render(<Logo />);
  it('렌더링 된다.', () => {
    const { asFragment } = renderLogo();
    expect(asFragment()).toMatchSnapshot();
  });

  it('이미지가 렌더링 된다.', () => {
    renderLogo();
    const image = screen.getByAltText('logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/logo.png');
  });

  it('로고 텍스트가 렌더링 된다', () => {
    renderLogo();
    const text = screen.getByText('포커 게임');
    expect(text).toBeInTheDocument();
  });
});
