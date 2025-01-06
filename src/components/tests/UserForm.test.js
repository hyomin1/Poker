import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';
import { queryContexts } from './utils';
import axios from 'axios';
import * as useAuth from '../../hooks/useAuth';
jest.mock('axios');
jest.mock('../../hooks/useAuth');

describe('UserForm', () => {
  const fakeAuth = {
    onLogin: { mutate: jest.fn() },
    onRegister: { mutate: jest.fn() },
  };

  const renderUserForm = (text) =>
    render(queryContexts(<UserForm text={text} />));
  beforeEach(() => {
    useAuth.default.mockReturnValue(fakeAuth);
    axios.post.mockReset();
  });
  afterEach(() => {
    fakeAuth.onLogin.mutate.mockReset();
    fakeAuth.onRegister.mutate.mockReset();
  });

  it('로그인 폼 렌더링', () => {
    renderUserForm('로그인');
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '아이디' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: '유저명' })).toBeNull();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  it('회원가입 폼 렌더링', () => {
    renderUserForm();
    expect(
      screen.getByRole('button', { name: '회원가입' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '아이디' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '유저명' })).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
  });

  it('로그인 폼 제출', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    renderUserForm('로그인');
    fireEvent.change(screen.getByRole('textbox', { name: '아이디' }), {
      target: { value: 'test1234' },
    });
    const password = screen.getByLabelText('비밀번호');
    fireEvent.change(password, { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() =>
      expect(fakeAuth.onLogin.mutate).toHaveBeenCalledWith({
        userId: 'test1234',
        password: '1234',
      })
    );
  });

  // 로그인 폼 제출 시 비밀번호 불일치 테스트

  it('회원가입 폼 제출', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });
    renderUserForm();
    fireEvent.change(screen.getByRole('textbox', { name: '아이디' }), {
      target: { value: 'testId1' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: '유저명' }), {
      target: { value: 'testUser1' },
    });
    const password = screen.getByLabelText('비밀번호');
    const confirmPassword = screen.getByLabelText('비밀번호 확인');
    fireEvent.change(password, { target: { value: '1234' } });
    fireEvent.change(confirmPassword, { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    await waitFor(() =>
      expect(fakeAuth.onRegister.mutate).toHaveBeenCalledWith({
        userId: 'testId1',
        username: 'testUser1',
        password: '1234',
      })
    );
  });

  it('회원가입 폼 제출 - 비밀번호 불일치', async () => {
    renderUserForm();
    fireEvent.change(screen.getByRole('textbox', { name: '아이디' }), {
      target: { value: 'testId1' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: '유저명' }), {
      target: { value: 'testUser1' },
    });
    const password = screen.getByLabelText('비밀번호');
    const confirmPassword = screen.getByLabelText('비밀번호 확인');
    fireEvent.change(password, { target: { value: '1234' } });
    fireEvent.change(confirmPassword, { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    await screen.findByText('패스워드가 일치하지 않습니다.');

    expect(fakeAuth.onRegister.mutate).not.toHaveBeenCalled();
  });
});
