import { render, screen } from '@testing-library/react';
import DealerButton from '../DealerButton';

describe('DealerButton', () => {
  const renderButton = () => render(<DealerButton />);

  it('버튼이 렌더링된다.', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('버튼에 D가 표시된다.cer', () => {
    render(<DealerButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('D');
  });
});
