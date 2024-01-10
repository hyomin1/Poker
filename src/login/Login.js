import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  border: 2px solid #e1b12c;
  &::placeholder {
    color: #2f3640;
    font-weight: bold;
  }
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
  background-color: #fbc531;
  border-radius: 10px;
  border: 2px solid #e1b12c;
  color: #dcdde1;
  &:hover {
    background-color: #e1b12c;
  }
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onValid = async (data) => {
    const { userId, password } = data;

    try {
      const res = await axios.post(`${BASE_URL}/login`, null, {
        params: {
          username: userId,
          password,
        },
      });

      console.log("로그인 성공", res.data);
      const subId = res.headers["subscribe-id"];
      client.connectHeaders = {
        userId,
        password,
      };
      navigate("/game", { state: { userData: res.data } });
      client.activate();
      client.subscribe(`/queue/${subId}`, function (message) {}); //로그인 시 개인 큐 구독
      client.subscribe(`/queue/error/${subId}`, function (message) {});
    } catch (error) {
      console.log("로그인 에러", error);
    }

    setValue("userId", "");
    setValue("password", "");
  };

  const onClickJoinBtn = (e) => {
    e.preventDefault();
    navigate("/join");
  };

  return (
    <LoginContainer>
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
            placeholder="아이디"
          />
          <LoginSpan>{errors.userId?.message}</LoginSpan>
          <LoginInput
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호"
          />
          <LoginSpan>{errors.password?.message}</LoginSpan>
          <BtnDiv>
            <LoginBtn>로그인</LoginBtn>
            <LoginBtn onClick={onClickJoinBtn}>회원가입</LoginBtn>
          </BtnDiv>
        </LoginForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Login;
