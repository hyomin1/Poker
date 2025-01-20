import { fireEvent, render, screen } from '@testing-library/react';
import ActionButton from '../ActionButton';

describe('ActionButton', () => {
  const mockOnClick = jest.fn();
  const label = '폴드';
  const renderActionButton = () =>
    render(<ActionButton onClick={mockOnClick} label={label} />);

  it('렌더링된다.', () => {
    const { asFragment } = renderActionButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('버튼이 전달된 label을 표시한다', () => {
    renderActionButton();
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });
  it('버튼 클릭 시 onClick 핸들러가 호출된다.', () => {
    renderActionButton();
    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
