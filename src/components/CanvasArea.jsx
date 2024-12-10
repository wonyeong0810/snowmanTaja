import React, { useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  border: 2px solid #f4e2d8;
  width: 80%;
  height: 80%;
  background-color: #ffffffcc;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

function CanvasArea() {
  useEffect(() => {
    const canvas = document.getElementById("snowmanCanvas");
    const ctx = canvas.getContext("2d");
    // 예제: 캔버스에 눈사람 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(150, 200, 50, 0, Math.PI * 2, true); // 몸통
    ctx.fill();

    ctx.beginPath();
    ctx.arc(150, 130, 40, 0, Math.PI * 2, true); // 머리
    ctx.fill();

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(150, 130);
    ctx.lineTo(170, 140);
    ctx.lineTo(150, 145);
    ctx.closePath();
    ctx.fill(); // 코
  }, []);

  return (
    <CanvasContainer>
      <Canvas id="snowmanCanvas" width="400" height="400" />
    </CanvasContainer>
  );
}

export default CanvasArea;
