import { styled } from 'styled-components';
import Form from 'react-bootstrap/Form';
import './user.css';
import useUser from '../hooks/useUser';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const UserImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid red;
  display: none;
`;

const ProfileSubmitButton = styled.label`
  padding: 10px 20px;
  background-color: #3498db; /* 변경된 배경색 */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: #2980b9; /* 호버 시 변경될 배경색 */
  }
`;
const UserInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Label = styled.label`
  color: #15202b;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #f0f2f5;
  color: #15202b;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

function UserProfile() {
  const img = '/images/defaultProfile.png';
  const {
    userQuery: { isLoading: userLoading, error: userError, data: user },
    imageQuery: { isLoading: imgLoading, error: imgError, data: image },
    updateImage,
  } = useUser();

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append('file', e.currentTarget.files[0]);
    updateImage.mutate(formData);
  };
  if (userLoading || imgLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <UserContainer>
      <UserImageWrapper>
        <UserImage src={image ? URL.createObjectURL(image) : img} />
        <ProfileForm>
          <Button text='이미지 업로드' />
          {/* <ProfileSubmitButton htmlFor='image'>
            이미지 업로드
          </ProfileSubmitButton> */}
          <ProfileInput onChange={handleFileChange} type='file' id='image' />
        </ProfileForm>
      </UserImageWrapper>

      <UserInfo>
        <FormInput
          type='text'
          name='userId'
          text='아이디'
          disabled={true}
          value={user.userId}
        />
        <Label>아이디</Label>
        <Input value={user.userId || ''} disabled />
      </UserInfo>
      <UserInfo>
        <Label>이름</Label>
        <Input value={user.userName || ''} disabled />
      </UserInfo>
      <UserInfo>
        <Label>보유 금액</Label>
        <Input value={user.money || ''} disabled />
      </UserInfo>
    </UserContainer>
  );
}

export default UserProfile;
