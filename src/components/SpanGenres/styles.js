import styled from "styled-components";

export const Container = styled.div`
 display: flex;
 margin-top: 30px;
 gap: 10px;

 span{
    padding: 8px 18px;
    border: 2px solid #FFFFFF;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    background-color: #0f0f0f;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
 }

   @media (max-width: 1024px) {
    span:nth-child(n + 5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
   span {
      font-size: 10px;
   }
    span:nth-child(n + 3) {
      display: none;
    }
  }
`