import React from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import ProfileImage from '../components/ProfileImage';
import useUser from '../hooks/useUser';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function DashBoard() {
  const {
    userQuery: { isLoading: userLoading, error: userError, data: user },
    imageQuery: { isLoading: imgLoading, error: imgError, data: image },
    updateImage,
  } = useUser();
  if (userLoading || imgLoading) {
    return <Loading />;
  }
  if (userError || imgError) {
    return <Error />;
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
      <div className='space-y-4'>
        <Button text='플레이' path='/lobby' />
        <Button text='핸드히스토리' path='/' />
      </div>
    </div>
  );
}
