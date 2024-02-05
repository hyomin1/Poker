import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import Form from "react-bootstrap/Form";
import "./user.css";

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #7f8fa6;
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
`;

const labelStyle = {
  color: "#dcdde1",
  fontWeight: "bold",
  fontSize: 20,
};
const inputStyle = {
  backgroundColor: "#343A40",
};

function UserProfile() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const img = "/images/defaultProfile.png";

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const getProfile = async () => {
      let res;
      try {
        res = await axios.get(`${BASE_URL}/api/user/profile`);
        console.log("유저 정보", res.data);

        setUser(res.data);
      } catch (error) {
        console.log("유저 정보 가져오기 에러", error);
        if (error.response) {
          alert(error.response.data.message);
        }
      }
      try {
        const res2 = await axios.get(
          `${BASE_URL}/api/user/image/${res.data.imagePath}`,
          { responseType: "blob" }
        );
        setImage(res2.data);
      } catch (error) {
        console.error("프로필 사진 가져오기 에러", error);
        // if (error.response) {
        //   alert(error.response.data.message);
        // }
      }
    };
    getProfile();
  }, []);

  const createFormData = (data) => {
    const { profileImg } = data;
    const formData = new FormData();
    formData.append("file", profileImg[0]);
    return formData;
  };

  const sendImg = async (data) => {
    const formData = createFormData(data);
    try {
      const res = await axios.post(`${BASE_URL}/api/user/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res2 = await axios.get(
        `${BASE_URL}/api/user/image/${res.data.imagePath}`,
        {
          responseType: "blob",
        }
      );
      setImage(res2.data);
      console.log("사진 전송", res.data);
    } catch (error) {
      console.log("사진전송에러", error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
  // console.log(user);

  return (
    <UserContainer>
      <UserImageWrapper>
        <UserImage src={image ? URL.createObjectURL(image) : img} />
        <form onSubmit={handleSubmit(sendImg)}>
          <input {...register("profileImg")} type="file" />
          <input type="submit" value="완료" />
        </form>
      </UserImageWrapper>

      <Form.Group className="mb-3">
        <Form.Label style={labelStyle}>유저 아이디</Form.Label>
        <Form.Control
          className="inputStyle"
          placeholder={user.userId}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={labelStyle}>유저명</Form.Label>
        <Form.Control
          className="inputStyle"
          placeholder={user.userName}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={labelStyle}>보유 금액</Form.Label>
        <Form.Control
          className="inputStyle"
          placeholder={user.money}
          disabled
        />
      </Form.Group>
    </UserContainer>
  );
}

export default UserProfile;
