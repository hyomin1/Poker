import { render, screen } from '@testing-library/react';
import Pot from '../Pot';

describe('Pot', () => {
  it('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Pot />);
    expect(screen.getByText('POT')).toBeInTheDocument();
  });
});
