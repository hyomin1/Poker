import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { styled } from "styled-components";

const HudContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  //padding: 10px 20px;
`;

const UserImg = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.span`
  color: white;
  font-weight: bold;
  font-size: 30px;
`;
const PlayCount = styled(UserName)`
  font-size: 20px;
  margin-bottom: 10px;
`;

const HudInform = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
`;

const HudBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HudText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
const HudPercent = styled.div`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

function Hud() {
  const receivedData = JSON.parse(window.name);

  const { hudData } = receivedData;

  const [hud, setHud] = useState({});

  useEffect(() => {
    setHud(hudData);
  }, []);
  console.log(hudData);

  return (
    <HudContainer>
      <div>
        <UserName>{hud.userName}'s HUD</UserName>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserImg>사진</UserImg>
        </div>

        <InformBox>
          <PlayCount>{hud.totalHands} GAME</PlayCount>
          <HudInform>
            <HudBox>
              <HudText>VPIP</HudText>
              <CircularProgressbarWithChildren
                value={
                  hud.totalHands !== 0 ? (hud.vpip / hud.totalHands) * 100 : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "red",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },

                  trail: {
                    stroke: "#d7d7d7",
                  },
                }}
              >
                <HudPercent>
                  {hud.totalHands !== 0
                    ? (hud.vpip / hud.totalHands).toFixed(1) * 100
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>
            <HudBox>
              <HudText>PFR</HudText>
              <CircularProgressbarWithChildren
                value={
                  hud.totalHands !== 0 ? (hud.pfr / hud.totalHands) * 100 : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "orange",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.totalHands !== 0
                    ? (hud.pfr / hud.totalHands).toFixed(1) * 100
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox>
              <HudText>CBET</HudText>
              <CircularProgressbarWithChildren
                value={
                  hud.pfAggressiveCnt !== 0 ? hud.cbet / hud.pfAggressiveCnt : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "yellow",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.pfAggressiveCnt !== 0
                    ? (hud.cbet / hud.pfAggressiveCnt).toFixed(1)
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox>
              <HudText>3BET</HudText>
              <CircularProgressbarWithChildren
                value={hud.wtf !== 0 ? hud.threeBet / hud.wtf : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "green",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtf !== 0 ? (hud.threeBet / hud.wtf).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>
            <HudBox>
              <HudText>WTSD</HudText>
              <CircularProgressbarWithChildren
                value={hud.wtf !== 0 ? hud.wtsd / hud.wtf : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "blue",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtf !== 0 ? (hud.wtsd / hud.wtf).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>
            <HudBox>
              <HudText>WSD</HudText>
              <CircularProgressbarWithChildren
                value={hud.wtsd !== 0 ? hud.wsd / hud.wtsd : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "violet",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtsd !== 0 ? (hud.wsd / hud.wtsd).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>
          </HudInform>
        </InformBox>
      </div>
    </HudContainer>
  );
}

export default Hud;
