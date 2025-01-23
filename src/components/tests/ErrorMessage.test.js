import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  const renderErrorMessage = (text) => render(<ErrorMessage text={text} />);

  it('주어진 text로 에러메시지가 출력된다.', () => {
    renderErrorMessage('에러 발생');
    expect(screen.getByText('에러 발생')).toBeInTheDocument();
  });
});
