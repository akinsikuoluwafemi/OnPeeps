import React, { useLayoutEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";

import Button from "utils/Buttons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { moveup } from "utils/Nav";

const NavContainer = styled.div`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding: 0.5rem 3rem;
  box-shadow: 2px 2px 2px rgba(66, 89, 143, 0.24);
  transform: translateY(-100%);
  animation: ${moveup} 0.5s ease forwards;

  // @media (max-width: 629px) {
  //   padding: 0.5rem 2rem;
  // }
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
  gsap.registerPlugin(ScrollTrigger);

  const navRef = useRef<HTMLDivElement>(null);

  // fix an issue with gsap and nextjs
  React.useLayoutEffect = React.useEffect;

  // useLayoutEffect(() => {
  //   const nav = navRef.current;

  //   gsap.fromTo(
  //     nav,
  //     {
  //       opacity: 0,
  //       y: -100,
  //     },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1,
  //       ease: "power4.out",
  //       scrollTrigger: {
  //         trigger: nav,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: 1,
  //       },
  //     }
  //   );
  // }, []);

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
          <Link href="/contact">
            <a>Contact Us</a>
          </Link>
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

// export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
export default Navbar;
