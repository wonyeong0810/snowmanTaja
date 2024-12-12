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

function CanvasArea({ name, Kscore, Escore }) {
  useEffect(() => {
    console.log(name);
    const canvas = document.getElementById("snowmanCanvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate sizes based on scores
    const bodyRadius = Math.max(Kscore * 5, 10); // 몸통 반지름 (최소값 10)
    const headRadius = Math.max(Escore * 4, 8); // 머리 반지름 (최소값 8)

    // Center position
    const centerX = canvas.width / 2;
    const bodyCenterY = canvas.height / 2 + bodyRadius;
    const headCenterY = bodyCenterY - bodyRadius - headRadius;

    // Draw body
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(centerX, bodyCenterY, bodyRadius, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw head
    ctx.beginPath();
    ctx.arc(centerX, headCenterY, headRadius, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw nose
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(centerX, headCenterY);
    ctx.lineTo(centerX + headRadius, headCenterY + 10);
    ctx.lineTo(centerX, headCenterY + 15);
    ctx.closePath();
    ctx.fill();

    // Draw name
    ctx.fillStyle = "black";
    ctx.font = "20px 'Arial', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name || "안녕", centerX, 40);
  }, [name, Kscore, Escore]);

  return (
    <CanvasContainer>
      <Canvas id="snowmanCanvas" width="400" height="400" />
    </CanvasContainer>
  );
}

export default CanvasArea;
