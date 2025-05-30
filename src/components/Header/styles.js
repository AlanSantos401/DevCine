import styled from "styled-components";

export const Container = styled.div`
  min-height: 100px;
  width: 100%;
  height: 100px;
  z-index: 199;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px 0px 5px;
  background-color: ${props => props.changeBackground ? '#000' : 'transparent'};
  transition: background-color 0.6s ease-in-out;

  img {
   width: 35%;
   cursor: pointer;
  }
`;

export const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 50px;
`;
export const Li = styled.li`
 
   font-weight: 600;
   cursor: pointer;
   font-size: 32px;
   position: relative;

   a {
    text-decoration: none;
      color: #ffffff;
   }

   &::after {
    content: '';
    height: 3px;
    width: ${(props => props.isActive ? '100%' : 0)};
    background-color: #189b20;
    position: absolute;
    bottom: -10px;
    transition: width 0.5s ease-in-out;
    left: 50%;
    transform: translateX(-50%);
   }

   &:hover::after{
    width: 100%;
   }
`;
