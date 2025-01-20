import { fireEvent, render, screen } from '@testing-library/react';
import { BuyInModal } from '../BuyInModal';

describe('BuyInModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const renderModal = (isOpen) => {
    render(
      <BuyInModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
  };
  it('모달이 닫혀있으면 렌더링되지 않는다.', () => {
    renderModal(false);
    expect(screen.queryByText('바이인 설정')).not.toBeInTheDocument();
  });

  it('모달이 열려려있으면 렌더링 된된다.', () => {
    renderModal(true);
    expect(screen.getByText('바이인 설정')).toBeInTheDocument();
    expect(screen.getByText('100 BB')).toBeInTheDocument();
  });

  it('취소 버튼을 클릭하면 onClose가 호출된다.', () => {
    renderModal(true);

    const button = screen.getByRole('button', { name: '취소' });
    fireEvent.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('확인 버튼을 클릭하면 onConfirm이 현재 BB값으로 호출된다.', () => {
    renderModal(true);
    const button = screen.getByRole('button', { name: '확인' });
    fireEvent.click(button);
    expect(mockOnConfirm).toHaveBeenCalledWith(50);
  });

  it('슬라이더를 조작하면 BB 값이 변경된다.', () => {
    renderModal(true);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '75' } });

    expect(screen.getByText('75 BB')).toBeInTheDocument();
  });
});
