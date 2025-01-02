import React from 'react';
import Logo from '../../components/Logo';
import UserForm from '../../components/UserForm';
import AuthImage from '../../components/AuthImage';

export default function Login() {
  return (
    <div className='flex h-[95vh]'>
      <section className='flex flex-col justify-center flex-grow w-full md:basis-1/3'>
        <Logo />
        <UserForm text={'로그인'} />
      </section>
      <section className='flex items-center justify-center flex-grow w-full md:block md:basis-2/3'>
        <AuthImage />
      </section>
    </div>
  );
}
