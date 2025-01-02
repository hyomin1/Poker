import React from 'react';

export default function FormInput({ type, name, register, text, placeholder }) {
  return (
    <>
      <label
        className='mt-10 mb-2 text-xs font-semibold text-gray-400'
        htmlFor={name}
      >
        {text}
      </label>
      <input
        className='mt-2 border-b-2 border-[#000842] focus:outline-none placeholder-[#000842] placeholder:font-semibold pb-2 placeholder:text-sm'
        id={name}
        type={type}
        {...register(name, { required: true })}
        placeholder={placeholder}
      />
    </>
  );
}
