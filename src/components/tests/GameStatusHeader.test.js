import { fireEvent, render, screen } from '@testing-library/react';
import GameStatusHeader from '../GameStatusHeader';

describe('GameStatusHeader', () => {
  const onExit = jest.fn();
  const renderHeader = (isWaiting) =>
    render(
      <GameStatusHeader isWaiting={isWaiting} onExit={onExit} playerCount={2} />
    );

  it('컴포넌트가 정상적으로 렌더링된다.', () => {
    renderHeader(false);
    expect(screen.getByText('나가기')).toBeInTheDocument();
  });

  it('isWaiting이 true일 경우 대기중 상태가 표시된다.', () => {
    renderHeader(true);
    expect(screen.getByText('대기중')).toBeInTheDocument();
  });

  it('isWaiting이 false일 경우 대기중 상태가 표시되지 않는다.', () => {
    renderHeader(false);
    expect(screen.queryByText('대기중')).not.toBeInTheDocument();
  });

  it('나가기 버튼 클릭 시 onExit가 호출된다.', () => {
    renderHeader(false);
    const button = screen.getByRole('button', { name: '나가기' });
    fireEvent.click(button);
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
