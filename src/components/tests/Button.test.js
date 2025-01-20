import { render, screen } from '@testing-library/react';
import Button from '../Button';
import { MemoryRouter } from 'react-router-dom';

describe('Button', () => {
  const text = '로그인';
  const renderButton = (path = null) =>
    render(
      <MemoryRouter>
        <Button text={text} path={path} />
      </MemoryRouter>
    );
  it('버튼이 렌더링된다.', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('버튼에 전달된 텍스트가 렌더링된다.', () => {
    renderButton();
    expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
  });

  it('path prop이 주어지면 Link 컴포넌트를 포함해야 한다.', () => {
    const path = '/profile';
    renderButton(path);

    const link = screen.getByRole('link', { name: text });
    expect(link).toHaveAttribute('href', path);
  });

  it('path prop이 없다면 Link 컴포넌트가 존재하지 않는다.', () => {
    renderButton();
    expect(screen.queryByRole('link', { name: text })).not.toBeInTheDocument();
  });
});
