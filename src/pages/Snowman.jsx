import React from "react";
import RankBar from "../components/RankBar";
import CanvasArea from "../components/CanvasArea";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  /* flex-direction: row-reverse; RankBar를 오른쪽으로 이동 */
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: white;
  position: relative;
  overflow: hidden;
`;

const Snowflake = styled.div`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  font-size: ${({ size }) => size}px;
  animation: fall ${({ duration }) => duration}s linear infinite;

  @keyframes fall {
    from {
      transform: translateY(-10vh);
    }
    to {
      transform: translateY(110vh);
    }
  }
`;

function Snowman() {
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 15 + 5,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <Container>
      <CanvasArea />
      <RankBar />
      {snowflakes.map(({ id, top, left, size, duration }) => (
        <Snowflake
          key={id}
          top={top}
          left={left}
          size={size}
          duration={duration}
        >
          ❄
        </Snowflake>
      ))}
    </Container>
  );
}

export default Snowman;
