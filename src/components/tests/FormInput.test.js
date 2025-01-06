import { fireEvent, render, screen } from '@testing-library/react';
import FormInput from '../FormInput';

describe('FormInput', () => {
  let register;
  beforeEach(() => {
    register = jest.fn();
  });

  const renderFormInput = () =>
    render(
      <FormInput
        type='text'
        name='userId'
        register={register}
        text='아이디'
        placeholder='아이디를 입력해주세요'
      />
    );

  it('렌더링 된다.', () => {
    const { asFragment } = renderFormInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it('사용자가 값을 입력할 수 있다', () => {
    renderFormInput();
    const input = screen.getByPlaceholderText('아이디를 입력해주세요');

    fireEvent.change(input, { target: { value: 'leehm0107' } });
    expect(input.value).toBe('leehm0107');
  });

  it('register가 호출된다.', () => {
    renderFormInput();
    expect(register).toHaveBeenCalledWith('userId', {
      required: '아이디를 입력해주세요',
    });
  });
});
