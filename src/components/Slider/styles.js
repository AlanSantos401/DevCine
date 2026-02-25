import styled from "styled-components";

export const Container = styled.div`
  background: #000;
  padding: 0 20px;
  cursor: grab;

  h2 {
    color: #ffffff;
    font-size: 24px;
    margin: 50px 0 20px 20px;
  }

  /* Swiper principal */
  .swiper {
    width: 100%;
    overflow: hidden;
  }

  /* Wrapper (Swiper já usa flex internamente) */
  .swiper-wrapper {
    display: flex;
  }

  /* Cada slide */
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;