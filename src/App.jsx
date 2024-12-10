import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: "Danjo-bold-Regular";
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body{
    display:block;
    background-color: #ffffff;
  }

`;

const AppContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100vh;
  margin: 0;
`;
function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AppContainer>
        <Outlet></Outlet>
      </AppContainer>
    </>
  );
}

export default App;
