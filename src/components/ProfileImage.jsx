import React from 'react';

export default function ProfileImage({ image, updateImage }) {
  const defaultImg = '/images/defaultProfile.png';
  const onChangeImage = (e) => {
    const formData = new FormData();
    formData.append('file', e.currentTarget.files[0]);
    updateImage.mutate(formData);
  };

  return (
    <div>
      <img
        src={image && image.size > 0 ? URL.createObjectURL(image) : defaultImg}
        alt='profile'
      />
      <input onChange={onChangeImage} type='file' />
    </div>
  );
}
