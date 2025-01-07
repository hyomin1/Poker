import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function FormInput({
  type,
  name,
  register,
  text,
  placeholder,
  errors,
  disabled = false,
  value,
}) {
  return (
    <div className='mb-6'>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium text-gray-700'
      >
        {text}
      </label>
      <input
        id={name}
        type={type}
        {...(disabled ? { value: value || '' } : {})}
        {...(register ? register(name, { required: placeholder }) : {})}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
      />
      {errors?.[name] && <ErrorMessage text={errors?.[name].message} />}
    </div>
  );
}
