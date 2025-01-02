import { render } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  const renderButton = (text) => render(<Button text={text} />);
  it('버튼이 렌더링된다.', () => {
    const { asFragment } = renderButton('로그인');
    expect(asFragment()).toMatchSnapshot();
  });
});
