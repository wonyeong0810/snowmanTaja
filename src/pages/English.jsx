import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Sample words for typing practice
const WORDS = [
  "리액트",
  "자바스크립트",
  "컴포넌트",
  "상태관리",
  "프로그래밍",
  "개발자",
  "학습",
  "코딩",
  "알고리즘",
  "타이핑",
];

// Styled Components
const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const CanvasContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const WordDisplay = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: 2px solid gray;
`;

const ScoreBoard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TimeBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TimeBar = styled.div`
  height: 100%;
  background-color: ${(props) =>
    props.percentage > 20 ? "#4caf50" : "#f44336"};
  width: ${(props) => props.percentage}%;
  transition: width 0.1s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

function English() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState(1000); // Initial timer interval
  const inputRef = useRef(null);
  const canvasRef = useRef(null); // Reference for canvas
  const [rotationAngle, setRotationAngle] = useState(0); // State to control the rotation angle

  // Select a random word
  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  };

  const handleGameEnd = () => {
    navigate("/snowman"); // 결과 페이지로 점수 전달
  };

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setTimerInterval(1000); // Reset interval to 1 second
    setCurrentWord(selectRandomWord());
    setIsGameActive(true);
    setInputValue("");
    inputRef.current.focus();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press (Enter to check answer)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputValue === currentWord) {
        // Correct word
        setScore((prevScore) => prevScore + 1);
        setCurrentWord(selectRandomWord());
        setInputValue("");

        // Increase remaining time (max 60 seconds)
        setTimeLeft((prevTime) => Math.min(60, prevTime + 3)); // Add 3 seconds

        // Decrease timer interval for faster countdown
        setTimerInterval((prevInterval) => Math.max(200, prevInterval - 50)); // Minimum interval: 200ms
      } else {
        // Incorrect word
        setInputValue("");
      }
    }
  };

  // Game timer
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, timerInterval);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
    }

    return () => clearInterval(timer);
  }, [isGameActive, timeLeft, timerInterval]);

  // Draw the rotating snowball on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;

    // canvas가 존재하지 않으면 실행하지 않음
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the Christmas background (snow and tree)
    // Snowy sky background
    ctx.fillStyle = "#87CEEB"; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height - 50); // Upper part of canvas

    // Ground
    ctx.fillStyle = "#FFFFFF"; // White snow
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50); // Bottom snow part

    // Draw snowflakes
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1; // Snowflake size
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
    }

    // // Draw tree trunk (shifted up by 20px)
    // ctx.fillStyle = "#8B4513"; // Brown color for trunk
    // ctx.fillRect(375, 280, 50, 100); // Tree trunk

    // Draw tree layers (shifted up by 20px)
    const layers = [
      { x: 100, y: 80, width: 200, height: 150, color: "#006400" },
      { x: 100, y: 160, width: 250, height: 150, color: "#228B22" },
      { x: 100, y: 240, width: 300, height: 150, color: "#32CD32" },
    ];
    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(layer.x, layer.y); // Top point of triangle
      ctx.lineTo(layer.x - layer.width / 2, layer.y + layer.height); // Bottom left
      ctx.lineTo(layer.x + layer.width / 2, layer.y + layer.height); // Bottom right
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    });

    // // Draw decorations
    // const colors = ["#FF0000", "#FFD700", "#00BFFF", "#FFA500"];
    // for (let i = 0; i < 30; i++) {
    //   const x = 300 + Math.random() * 200;
    //   const y = 130 + Math.random() * 200; // Decorations moved up slightly
    //   const color = colors[Math.floor(Math.random() * colors.length)];
    //   ctx.beginPath();
    //   ctx.arc(x, y, 5, 0, Math.PI * 2);
    //   ctx.fillStyle = color;
    //   ctx.fill();
    // }

    // Draw star on top
    const x = 100;
    const y = 80; // Star moved up
    const starRadius = 15;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        x + starRadius * Math.cos(((18 + i * 72) * Math.PI) / 180),
        y - starRadius * Math.sin(((18 + i * 72) * Math.PI) / 180)
      );
      ctx.lineTo(
        x + (starRadius / 2) * Math.cos(((54 + i * 72) * Math.PI) / 180),
        y - (starRadius / 2) * Math.sin(((54 + i * 72) * Math.PI) / 180)
      );
    }
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.fill();

    // Draw the snowball (rotate)
    const snowballSize = 50 + score * 5; // Snowball size based on score

    // Set center position for the snowball (no movement, just rotation)
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 40 - snowballSize;

    // Draw the rotating snowball
    ctx.save();
    ctx.translate(centerX, centerY); // Set the center position

    // Rotate the canvas by the current angle
    ctx.rotate(rotationAngle);

    // Draw the snowball (body part)
    ctx.beginPath();
    ctx.arc(0, 0, snowballSize, 0, Math.PI * 2); // Body (largest)
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#888";
    ctx.fill();
    ctx.closePath();

    // Draw buttons on the snowball (two buttons)
    ctx.beginPath();
    ctx.arc(0, -snowballSize / 4, 10, 0, Math.PI * 2); // Upper button
    ctx.arc(0, snowballSize / 4, 10, 0, Math.PI * 2); // Lower button
    ctx.fillStyle = "#000"; // Button color (black)
    ctx.fill();
    ctx.closePath();

    // Restore the canvas context to its original state
    ctx.restore();

    // Increment rotation angle for next frame (smooth rotation)
    setRotationAngle((prevAngle) => prevAngle + 0.001);

    // Request the next frame for animation
    requestAnimationFrame(() => {});
  }, [score, rotationAngle]); // Re-run when score changes or rotation angle changes

  // Calculate time bar percentage
  const timePercentage = (timeLeft / 60) * 100;

  return (
    <GameContainer>
      <h1>눈굴리기타자</h1>

      {isGameActive ? (
        <>
          <ScoreBoard>
            <div>점수: {score}</div>
            <div>남은 시간: {timeLeft}초</div>
          </ScoreBoard>

          <TimeBarContainer>
            <TimeBar percentage={timePercentage} />
          </TimeBarContainer>

          <CanvasContainer>
            <canvas ref={canvasRef} width={800} height={400} />
          </CanvasContainer>

          <WordDisplay>{currentWord}</WordDisplay>

          <InputField
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="단어를 입력하세요"
            disabled={!isGameActive}
          />
        </>
      ) : (
        <>
          <h2>
            {timeLeft === 0
              ? `게임 종료! 총 점수:  ${score}`
              : "눈사람 머리 만들기"}
          </h2>
          {timeLeft === 0 ? (
            <Button onClick={handleGameEnd}>결과 보기</Button> // 결과 페이지로 이동
          ) : (
            <Button onClick={startGame}>게임 시작</Button>
          )}
        </>
      )}
    </GameContainer>
  );
}

export default English;
