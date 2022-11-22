import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import NavbarMobile from "./NavbarMobile";
import dynamic from "next/dynamic";
import { selectOpen, toggleSidebar } from "slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Button from "utils/Buttons";
import Link from "next/link";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import FooterHomeMobile from "./FooterHomeMobile";

const MainContainer = styled.div`
  min-height: 100%;
  // width: 100vw;
`;

interface LayoutProps {
  children: React.ReactNode;
  name: string;
  description?: string;
  style?: React.CSSProperties;
  showFooter?: boolean;
}

const LayoutWrapper = styled.div`
  // min-height: 100vh;
`;

const Sidebar = styled.div<{ open: boolean }>`
  // font-size: 25px;
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  display: flex;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1200;
  flex: 1 0 auto;
  overflow-y: auto;
  // box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px;
  // rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px;
  box-shadow: ${({ open }) =>
    open ? `0 0 10px 1000px rgba(0, 0, 0, 0.5)` : ``};

  // transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 100vh;
  }
  // @media only screen and (max-device-width: 550px) {
  //   width: 100%;
  //   height: 100%;
  //   overflow: hidden;
  //   min-height: 100vh;
  // }
`;

const SidebarContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;


  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding-bottom: 2rem;

    img {
      height: 40px;
      width: 40px;
    }

    .icon-wrapper {
      position: relative;
      svg {
        cursor: pointer;
        user-select: none;
        font-size: 1.5rem;
        position: absolute;
        right: -30px;
        top: -20px;
      }
    }
  }

  .sidebar-main {
    padding-top: 2rem;
    // background-color: pink;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-top: 1px solid #e8e8e8;


    ul {
      list-style: none;
      margin-bottom: 1rem;
      padding: 6px 10px;
      font-size: 1.2rem;


      &:first-child {
        background-color: #f6f6f6;
        border-radius: 8px;
      }

      li {
        color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
      }
    }

    .btn {
      margin: 1rem auto;
      font-size: 1.2rem;

`;

const PageLayout: FC<LayoutProps> = ({
  children,
  name,
  description,
  showFooter,
}) => {
  const open = useSelector(selectOpen);
  const dispatch = useDispatch();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // pin sidebar to right with gsap

  gsap.registerPlugin(ScrollTrigger);

  return (
    <LayoutWrapper>
      <Head>
        <title>{name}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/images/cover.png" />
      </Head>
      {/* <div
        onClick={() => dispatch(toggleSidebar())}
        style={{ display: open ? "block" : "none", overflow: "hidden" }}
        className="backdrop"
      ></div> */}

      {isBigScreen && <Navbar />}
      {isTabletOrMobile && <NavbarMobile />}

      {isTabletOrMobile && (
        <Sidebar ref={sidebarRef} open={open}>
          <SidebarContent>
            <div className="sidebar-header">
              <img src="/images/cover.png" alt="logo" />
              <span
                className="icon-wrapper"
                onClick={() => dispatch(toggleSidebar())}
              >
                <AiOutlineClose />
              </span>
            </div>
            <div className="sidebar-main">
              <ul>
                <li>Home</li>
              </ul>

              <ul>
                <li>For Business</li>
              </ul>

              <ul>
                <li>Pricing</li>
              </ul>

              <ul>
                <li>How it works</li>
              </ul>

              <ul>
                <li>Safety</li>
              </ul>

              <ul>
                <li>Support</li>
              </ul>

              <ul>
                <li>Careers</li>
              </ul>

              <ul>
                <li>Contact Us</li>
              </ul>

              <Button className="btn" variant="primary">
                <Link href="/signup">
                  &nbsp; Sign Up &nbsp;
                </Link>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
      )}

      <MainContainer>{children}</MainContainer>

      {showFooter && (
        <>
          {isBigScreen && <Footer />}
          {isTabletOrMobile && <FooterHomeMobile />}
        </>
      )}
    </LayoutWrapper>
  );
};

export default dynamic(() => Promise.resolve(PageLayout), { ssr: false });
