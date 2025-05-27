import styled from "styled-components";


export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;

 button {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -120%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 28px;
  border: none;
  border-radius: 50%;     
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
`;
export const Container = styled.div`
  z-index: 299;
  background: #000;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 50px;
  max-width: 1200px;

  

  iframe {
    border: none;
  }
`

