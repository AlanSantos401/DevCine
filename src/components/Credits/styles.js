import styled from "styled-components";

export  const Title = styled.h4`
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;

  @media (max-width: 768px) {
     display: none;
  }
`

export const Container = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 10px;

  div {
  display: flex;
  flex-direction: column;
}

p {
    color: #ffffff;
}

img  {
    height: 200px;
}

@media (max-width: 1024px) {
    & > div:nth-child(n + 5) {
      display: none;
    }

    img {
      height: 150px;
    }
  }

  @media (max-width: 768px) {
     display: none;
  }
`