import React from 'react';

export default function ProfileImage({ image, updateImage }) {
  const defaultImg = '/images/defaultProfile.png';
  const onChangeImage = (e) => {
    const formData = new FormData();
    formData.append('file', e.currentTarget.files[0]);
    updateImage.mutate(formData);
  };

  return (
    <div className='relative group'>
      <img
        src={image && image.size > 0 ? URL.createObjectURL(image) : defaultImg}
        alt='profile'
        className='object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg'
      />
      <label className='absolute inset-0 flex items-center justify-center transition-opacity duration-200 bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100'>
        <span className='text-sm font-medium text-white'>이미지 변경</span>
        <input
          onChange={onChangeImage}
          type='file'
          className='hidden'
          accept='image/*'
        />
      </label>
    </div>
  );
}
