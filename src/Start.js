import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/pokerBack.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const StartBtn = styled.button`
  background-color: yellow;
  color: white;
`;

function Start() {
  return (
    <StartContainer>
      <StartBtn>
        <Link to={"/login"}>Start!!</Link>
      </StartBtn>
    </StartContainer>
  );
}

export default Start;
