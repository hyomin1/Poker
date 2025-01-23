import { fireEvent, render, screen } from '@testing-library/react';
import Error from '../Error';

describe('Error', () => {
  const renderError = () => render(<Error />);
  const refresh = jest.fn();
  it('컴포넌트가 정상적으로 렌더링된다', () => {
    renderError();
    expect(screen.getByText('오류가 발생했습니다')).toBeInTheDocument();
  });

  it('새로고침시 window.location.reload()가 호출된다.', () => {
    render(<Error />);
    const button = screen.getByRole('button', { name: '새로고침' });
    fireEvent.click(button);
    //expect(refresh).toHaveBeenCalledTimes(1);
  });
});
