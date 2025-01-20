import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import FormInput from './FormInput';

export default function UserForm({ text = '회원가입' }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { onLogin, onRegister } = useAuth();
  const isLogin = text === '로그인';

  const onSubmit = (data) => {
    const { userId, username, password, confirmPassword } = data;
    if (isLogin) {
      onLogin.mutate(data);
      return;
    }
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        message: '패스워드가 일치하지 않습니다.',
      });
      return;
    }
    onRegister.mutate({
      userId,
      username,
      password,
    });
  };

  useEffect(() => {
    reset();
  }, [navigate, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-full p-8 overflow-auto'
      aria-label='auth-form'
    >
      <h3 className='mb-6 text-2xl font-bold text-gray-800'>{text}</h3>
      <p className='mb-8 text-gray-600'>
        계정이 {isLogin ? '없다면 회원가입' : '있다면 로그인'}을 해주세요{' '}
        <Link
          to={isLogin ? '/register' : '/'}
          className='font-semibold text-purple-600 no-underline transition-colors hover:text-purple-800'
        >
          {isLogin ? '회원가입' : '로그인'}으로 가기
        </Link>
      </p>

      <div className='mb-8 space-y-6'>
        <FormInput
          type='text'
          name='userId'
          register={register}
          text='아이디'
          placeholder='아이디를 입력해주세요'
          errors={errors}
        />
        {!isLogin && (
          <FormInput
            type='text'
            name='username'
            register={register}
            text='유저명'
            placeholder='유저명을 입력해주세요'
            errors={errors}
          />
        )}
        <FormInput
          type='password'
          name='password'
          register={register}
          text='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          errors={errors}
        />
        {!isLogin && (
          <FormInput
            type='password'
            name='confirmPassword'
            register={register}
            text='비밀번호 확인'
            placeholder='비밀번호를 한번 더 입력해주세요'
            errors={errors}
          />
        )}
      </div>
      <Button text={text} />
    </form>
  );
}
