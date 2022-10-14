import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "utils/Buttons";

const NavContainer = styled.div`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding: 0.5rem 3rem;
  box-shadow: 2px 2px 2px rgba(66, 89, 143, 0.24);
`;

const MenuItem = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: teal;
  cursor: pointer;
`;
const MenuItems = styled.li`
  list-style: none;
  padding: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    // background-color: red;
    flex: 1 1 auto;
  }

  &:nth-child(2) {
    // background-color: orange;
    flex: 2 1 auto;
  }

  &:last-child {
    // background-color: pink;
    flex: 1 1 auto;
    text-align: end;
    display: inline-block;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <MenuItem>
        <MenuItems>
          <Link href="/">
            <a>
              <img
                style={{ height: "40px", width: "40px" }}
                src="images/cover.png"
              />
            </a>
          </Link>
        </MenuItems>
        <MenuItems>
          <a href="#">For Business</a>
          <a href="#">Pricing</a>
          <a href="#">How it works</a>
        </MenuItems>
        <MenuItems>
          <Button variant="primary">
            <Link href="/signup">
              <a>&nbsp; Sign Up &nbsp;</a>
            </Link>
          </Button>
        </MenuItems>
      </MenuItem>
    </NavContainer>
  );
};

export default Navbar;
