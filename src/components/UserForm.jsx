import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import FormInput from './FormInput';

export default function UserForm({ text }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onLogin, onRegister } = useAuth();
  const isLogin = text === '로그인';

  const onSubmit = (data) => {
    const { userId, username, password } = data;
    if (isLogin) {
      onLogin.mutate(data);
      return;
    }
    onRegister.mutate({
      userId,
      username,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-full p-8 overflow-auto'
    >
      <h3 className='mb-6 text-2xl font-bold text-gray-800'>{text}</h3>
      <p className='mb-8 text-gray-600'>
        계정이 {isLogin ? '없다면 회원가입' : '있다면 로그인'}을 해주세요{' '}
        <Link
          to={isLogin ? '/register' : '/'}
          className='font-semibold text-purple-600 transition-colors hover:text-purple-800'
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
        />
        {!isLogin && (
          <FormInput
            type='text'
            name='username'
            register={register}
            text='유저명'
            placeholder='유저명을 입력해주세요'
          />
        )}
        <FormInput
          type='password'
          name='password'
          register={register}
          text='비밀번호'
          placeholder='비밀번호를 입력해주세요'
        />
        {!isLogin && (
          <FormInput
            type='password'
            name='confirmPassword'
            register={register}
            text='비밀번호 확인'
            placeholder='비밀번호를 한번 더 입력해주세요'
          />
        )}
      </div>
      <Button text={text} />
    </form>
  );
}
