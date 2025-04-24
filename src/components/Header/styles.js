import styled from "styled-components";

export const Container = styled.div`
 min-height: 100px;
 height: 12%;
 width: 100%;
 z-index: 50;
 position: fixed;
 top: 0px;
 display: flex;
 justify-content: space-between;
 padding: 5px;
 align-items: center;
 padding: 10px 50px 0 10px;
 background-color: ${props => 
   props.$changeBackground ? '#000' : 'transparent'};
 transition: 0.6s ease-in-out;

 img {
    width: 21%;
 }
`

export const Menu = styled.ul`
 display: flex;
 list-style: none;
 gap: 50px;
`

export const Li = styled.li`
 color: #ffffff;
 font-weight: 600;
 cursor: pointer;
 font-size: 28px;
 position: relative;

 a {
    text-decoration: none;
    color: #ffffff;
 }

 &::after {
   content: '';
   height: 3px;
   width: ${props => props.$isActive ? '100%' : 0};
   background-color: #189b20;
   position: absolute;
   bottom: -10px;
   left: 50%;
   transform: translateX(-50%);
   transition: width 0.5s ease-in-out;

 }
 &:hover::after {
   width: 100%;
 }
`