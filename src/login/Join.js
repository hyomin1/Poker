import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/pokerBack.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const JoinForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  width: 20%;
`;

const JoinInput = styled.input`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 9px 7px;
  border: 2px solid gray;
  font-size: 15px;
  font-weight: bold;
`;
const JoinSpan = styled.span`
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 17px;
`;
const JoinBtn = styled.button`
  width: 40%;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
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
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.5,
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
        const res = await axios.post(`${BASE_URL}/join`, null, {
          params: {
            userId,
            password,
            userName,
          },
        });
        console.log("회원가입 성공", res.data);
        navigate("/login");
      } catch (error) {
        console.log("회원가입 에러", error);
      }
    }
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

          <BtnDiv>
            <JoinBtn>회원가입</JoinBtn>
            <JoinBtn>
              <Link to={"/login"}>뒤로가기</Link>
            </JoinBtn>
          </BtnDiv>
        </JoinForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Join;
