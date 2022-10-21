import styled, { keyframes } from "styled-components";

export const MenuItem = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: teal;
  cursor: pointer;
  width: 100%;
`;

export const MenuItems = styled.li`
  list-style: none;
  padding: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const moveup = keyframes`
  100%{
    transform: translateY(0);
  }
`;
