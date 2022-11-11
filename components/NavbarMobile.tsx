import Link from "next/link";
import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, selectOpen } from "../slices/sidebarSlice";
import { MenuItem, MenuItems, moveup } from "utils/Nav";

const NavContainerMedium = styled.div`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding: 0.5rem 3rem;
  box-shadow: 2px 2px 2px rgba(66, 89, 143, 0.24);
  transform: translateY(-100%);
  animation: ${moveup} 0.5s ease forwards;

  @media (max-width: 562px) {
    padding: 0.5rem 2rem;
  }
`;

const NavbarMobile = () => {
  const dispatch = useDispatch();

  return (
    <NavContainerMedium>
      <MenuItem>
        <MenuItems>
          <Link href="/">
            <a>
              <img
                style={{ height: "40px", width: "40px" }}
                src="../images/cover.png"
              />
            </a>
          </Link>
        </MenuItems>
        <MenuItems
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <img
            style={{ height: "40px", width: "40px" }}
            src="../images/icons/hamburger.svg"
          />
        </MenuItems>
      </MenuItem>
    </NavContainerMedium>
  );
};

export default NavbarMobile;
