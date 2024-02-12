import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL, api } from "../api";
import { client } from "../client";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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

const LoginForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  //margin-bottom: 100px;
  width: 18vw;
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Semi-transparent white background */
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); /* Drop shadow effect */
`;

const LoginInput = styled.input`
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
`;

const LoginSpan = styled.span`
  color: red;
  margin-top: 5px;
  font-weight: bold;
  font-size: 15px;
`;

const LoginBtn = styled.button`
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
  /* width: 40%;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  background-color: #fbc531;
  border-radius: 10px;
  border: 2px solid #e1b12c;
  color: #dcdde1;
  &:hover {
    background-color: #e1b12c;
  } */
`;

const loginVar = {
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
      // const res = await api.post("/login", null, {
      //   params: {
      //     username: userId,
      //     password,
      //   },
      // });
      const subId = res.headers["subscribe-id"]; //웹소켓 구독 + board에서 본인 찾기위함
      const playerId = parseInt(subId, 10);
      const res2 = await axios.get(`${BASE_URL}/api/board/context`);

      //재접속시 필요한 보드 데이터
      console.log("context", res2.data);

      // await Promise.all(
      //   res2.data.map(async (board) => {
      //     await Promise.all(
      //       board.players.map(async (player) => {
      //         console.log(playerId, player.userId);
      //         if (player.userId === playerId) {
      //           // await을 사용하여 비동기 처리를 기다린 후에 다음 코드 실행
      //           await axios.post(`${BASE_URL}/api/player/connect/${playerId}`);
      //         }
      //       })
      //     );
      //   })
      // );

      console.log("로그인 성공", res.data);

      client.connectHeaders = {
        userId,
        password,
      };

      navigate("/game", {
        state: { userData: data, userId: subId, existBoard: res2.data },
      });
      client.activate();
      client.onConnect = function (message) {
        //console.log("웹소켓 구독완료1");
        client.subscribe(`/queue/${subId}`, function (message) {}); //로그인 시 개인 큐 구독
        // client.subscribe(`/queue/error/${subId}`, function (message) {
        //   console.log("queue/error 에러메시지", message);
        // });
      };
    } catch (error) {
      console.log("로그인 에러", error);
      if (error.response) {
        alert(error.response.data.message);
      }
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
            type="password"
          />
          <LoginSpan>{errors.password?.message}</LoginSpan>

          <LoginBtn>로그인</LoginBtn>
          <LoginBtn onClick={onClickJoinBtn}>회원가입</LoginBtn>
        </LoginForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Login;
