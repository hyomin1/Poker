import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #15202b; /* Dark background color */
  /* background-image: url("/images/pokerBack.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
`;
const JoinForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 20vw;
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Semi-transparent white background */
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); /* Drop shadow effect */
`;

const JoinInput = styled.input`
  width: 100%;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #f0f2f5; /* Light gray background color */
  font-size: 16px;
  outline: none;
  font-weight: bold;
  //border: 2px solid #e1b12c;
  &::placeholder {
    color: #2f3640;
    font-weight: bold;
  }
  /* border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 9px 7px;
  border: 2px solid gray;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid #e1b12c;
  &::placeholder {
    color: #2f3640;
    font-weight: bold;
  } */
`;
const JoinSpan = styled.span`
  color: red;
  margin-top: 5px;
  font-weight: bold;
  font-size: 15px;
`;
const JoinBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  background-color: #1e88e5; /* Blue color */
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: #1565c0; /* Darker blue on hover */
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const joinVar = {
  start: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
    },
  },
};

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onValid = async (data) => {
    if (data.password !== data.chkpassword) {
      setError(
        "chkpassword",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      const { userId, userName, password } = data;

      try {
        const res = await axios.post(`${BASE_URL}/join`, {
          userId,
          userName,
          password,
        });
        console.log("회원가입 성공", res.data);
        navigate("/login");
      } catch (error) {
        console.log("회원가입 에러", error);
        if (error.response) {
          alert(error.response.data.message);
        }
      }
      //setValue로 필드초기화하기, 순서 봐보고
    }
  };

  const onClickBackBtn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <LoginContainer>
      <AnimatePresence>
        <JoinForm
          variants={joinVar}
          initial="start"
          animate="visible"
          onSubmit={handleSubmit(onValid)}
        >
          <JoinInput
            {...register("userId", {
              required: "아이디를 입력해주세요",
            })}
            placeholder="아이디"
          />
          <JoinSpan>{errors.userId?.message}</JoinSpan>

          <JoinInput
            {...register("userName", {
              required: "이름을 입력해주세요",
            })}
            placeholder="유저명"
          />
          <JoinSpan>{errors.userName?.message}</JoinSpan>

          <JoinInput
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호"
          />
          <JoinSpan>{errors.password?.message}</JoinSpan>

          <JoinInput
            {...register("chkpassword", {
              required: "비밀번호를 한번 더 입력해주세요",
            })}
            placeholder="비밀번호 확인"
          />
          <JoinSpan>{errors.chkpassword?.message}</JoinSpan>

          <JoinBtn>회원가입</JoinBtn>
          <JoinBtn onClick={onClickBackBtn}>뒤로가기</JoinBtn>
        </JoinForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Join;
