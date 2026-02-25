import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 30px;
    width: 300px;
    height: 450px;
  }

  h3 {
    color: #ffffff;
    margin-top: 15px;
  }

  @media (max-width: 1024px) {

    img {
      width: 190px;
      height: 300px;
    }
  }

   @media (max-width: 768px) {
  overflow-x: hidden;
    img {
      width: 190px;
      height: 280px;
    }
  }
`