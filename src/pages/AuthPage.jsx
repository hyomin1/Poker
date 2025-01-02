import React from 'react';
import Logo from '../components/Logo';
import UserForm from '../components/UserForm';
import AuthImage from '../components/AuthImage';

export default function AuthPage({ type }) {
  return (
    <div className='h-screen p-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='flex h-full max-h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl'>
        <section className='flex flex-col w-full p-6 md:w-2/5'>
          <Logo />
          <div className='flex-1 overflow-auto'>
            <UserForm text={type === 'login' ? '로그인' : '회원가입'} />
          </div>
        </section>
        <section className='hidden w-3/5 p-6 md:block'>
          <AuthImage />
        </section>
      </div>
    </div>
  );
}
