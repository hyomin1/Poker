import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import { client } from "../client";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/pokerBack.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StartBtn = styled(motion.span)`
  color: yellow;
  font-weight: bold;
  font-size: 60px;
  &:hover {
    font-size: 70px;
  }
`;
const LoginForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  width: 20%;
`;

const LoginInput = styled.input`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 5px 0;
  padding: 7px 5px;
  border: 2px solid gray;
  font-size: 15px;
  font-weight: bold;
`;

const LoginSpan = styled.span`
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 17px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const LoginBtn = styled.button`
  width: 40%;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
`;

const loginVar = {
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

function Login() {
  const [start, setStart] = useState(false);
  const goStart = () => setStart((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onValid = async (data) => {
    const { userId, password } = data;

    try {
      const res = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });
      console.log("로그인 성공", res.data);
      navigate("/game", { state: { userData: res.data } });
      client.activate();
    } catch (error) {
      console.log("로그인 에러", error);
    }

    setValue("userId", "");
    setValue("password", "");
  };

  return (
    <LoginContainer isStart={start}>
      <AnimatePresence>
        <LoginForm
          variants={loginVar}
          initial="start"
          animate="visible"
          onSubmit={handleSubmit(onValid)}
        >
          <LoginInput
            {...register("userId", {
              required: "아이디를 입력해주세요",
            })}
            placeholder="Id"
          />
          <LoginSpan>{errors.userId?.message}</LoginSpan>
          <LoginInput
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="Password"
          />
          <LoginSpan>{errors.password?.message}</LoginSpan>
          <BtnDiv>
            <LoginBtn>로그인</LoginBtn>
            <LoginBtn>
              <Link to={"/join"}>회원가입</Link>
            </LoginBtn>
          </BtnDiv>
        </LoginForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Login;
