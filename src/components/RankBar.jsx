import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const RankBarContainer = styled.div`
  width: 20%;
  background-color: #1e3c72;
  background-image: linear-gradient(315deg, #1e3c72 0%, #2a5298 74%);
  color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100vh;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      135deg,
      #ff0000 40%,
      #ffffff 40%,
      #ffffff 60%,
      #ff0000 60%
    );
    border-radius: 10px;
    background-size: 24px 60px; /* 막대사탕 느낌을 살리기 위해 큰 줄무늬 */
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5); /* 부드러운 붉은 그림자 */
  }

  &::-webkit-scrollbar-track {
    background: none; /* 트랙 비활성화 */
  }
`;

const RankTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #f4e2d8;
  text-shadow: 1px 1px 2px #000;
`;

const RankList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const RankItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #3b5998;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #1abc9c;
  }
`;

const RankInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 1.2rem;
`;

const Scores = styled.div`
  font-size: 0.9rem;
`;

const ScoreItem = styled.div`
  margin: 2px 0;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8); /* 초기 크기 축소 */
  background: white;
  color: black;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 1000;
  min-width: 300px;
  text-align: center;
  opacity: 0; /* 초기 투명 상태 */
  transition: opacity 0.3s ease, transform 0.3s ease; /* 애니메이션 */

  &.show {
    opacity: 1; /* 완전하게 보임 */
    transform: translate(-50%, -50%) scale(1); /* 원래 크기로 복구 */
  }

  & h2 {
    margin-top: 0;
  }

  & button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #1e3c72;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #2a5298;
    }
  }
`;

function RankBar() {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchRankings = async () => {
      try {
        const response = await axios.get(
          "https://port-0-snowmantaja-m4i0iy3b2d0cd031.sel4.cloudtype.app/scores/sorted/"
        ); // API URL
        setRankings(response.data); // 데이터를 상태로 설정
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      }
    };

    fetchRankings();
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  const [popupData, setPopupData] = useState(null);

  const handleClick = (rank) => {
    setPopupData(rank);
  };

  const handleClosePopup = () => {
    setPopupData(null);
  };

  return (
    <>
      <RankBarContainer>
        <RankTitle>Top Rankings 🎄</RankTitle>
        <RankList>
          {rankings.map((rank, index) => (
            <RankItem key={index} onClick={() => handleClick(rank)}>
              <RankInfo>
                <Name>{`${index + 1}. ${rank.name}`}</Name>
                <Scores>
                  <ScoreItem>KR: {rank.korean}</ScoreItem>
                  <ScoreItem>EN: {rank.english}</ScoreItem>
                  <ScoreItem>Total: {rank.total}</ScoreItem>
                </Scores>
              </RankInfo>
            </RankItem>
          ))}
        </RankList>
      </RankBarContainer>

      {popupData && (
        <PopupContainer className="show">
          <h2>{popupData.name}</h2>
          <p>Korean Score: {popupData.korean}</p>
          <p>English Score: {popupData.english}</p>
          <p>Total Score: {popupData.total}</p>
          <button onClick={handleClosePopup}>Close</button>
        </PopupContainer>
      )}
    </>
  );
}

export default RankBar;
