import styled from "styled-components";

export const Background = styled.div`
 height: 100vh;
 width: 100vw;
 z-index: 99;
 background-color: rgba(0, 0, 0, 0.6);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
`

export const Container = styled.div`
  background: #000;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 50px;
  max-width: 1200px;

  iframe {
    border: none;

  }

  button {
    width: 40px;
    font-size: 30px;
    height: 40px;
    position: absolute;
    border: none;
    border-radius: 50%;
    top: -70px;
    color: #ffffff;
    background: #000;
    opacity: 0.5;
    cursor: pointer;
    z-index: 999;

  }
`

