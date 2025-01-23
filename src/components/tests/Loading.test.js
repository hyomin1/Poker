import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  it('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Loading />);
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
  });
});
