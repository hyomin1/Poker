import { render, screen } from '@testing-library/react';
import Chip from '../Chip';

describe('Chip', () => {
  const renderChip = (amount = 100) => render(<Chip amount={amount} />);
  it('칩이 렌더링된다.', () => {
    const { asFragment } = renderChip();
    expect(asFragment()).toMatchSnapshot();
  });

  it('전달된 amount가 정상적으로 표시된다.', () => {
    const amount = 150;
    renderChip(amount);
    const text = screen.getByText(amount);
    expect(text).toBeInTheDocument();
  });
});
