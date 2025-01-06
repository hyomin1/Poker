import React from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import ProfileImage from '../components/ProfileImage';
import useUser from '../hooks/useUser';

export default function DashBoard() {
  const {
    userQuery: { isLoading: userLoading, error: userError, data: user },
    imageQuery: { isLoading: imgLoading, error: imgError, data: image },
    updateImage,
  } = useUser();
  if (userLoading || imgLoading) {
    return <p>로딩중...</p>;
  }
  if (userError || imgError) {
    return <p>에러...</p>;
  }

  return (
    <div>
      <ProfileImage image={image} updateImage={updateImage} />
      <FormInput
        type='text'
        name='userId'
        text='아이디'
        disabled={true}
        value={user.userId}
      />
      <FormInput
        type='text'
        name='username'
        text='유저명'
        disabled={true}
        value={user.userName}
      />
      <FormInput
        type='text'
        name='userId'
        text='보유 금액'
        disabled={true}
        value={user.money}
      />
      <Button text='플레이' path='/' />
      <Button text='핸드히스토리' path='/' />
    </div>
  );
}
