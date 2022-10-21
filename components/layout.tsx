import Navbar from "./Navbar";
import Footer from "./Footer";
import { FC } from "react";
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

const MainContainer = styled.div`
  min-height: 100vh;
  // width: 100vw;
`;

interface LayoutProps {
  children: React.ReactNode;
  name: string;
  description?: string;
  style?: React.CSSProperties;
}

const LayoutWrapper = styled.div``;

const Sidebar = styled.div<{ open: boolean }>`
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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  scroll: none;
  padding: 2rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const SidebarContent = styled.div`
  // background-color: teal;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  // margin-top: 4rem;
  display: flex;
  flex-direction: column;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    // background-color: red;
    align-items: center;
    width: 90%;
    padding-bottom: 1.5rem;

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
    padding-top: 1.5rem;
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
      margin-bottom: 1.5rem;

      &:first-child {
        background-color: #f6f6f6;
        border-radius: 8px;
        padding: 0.8rem 0.5rem;
      }

      li {
        color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
      }
    }

    .btn {
      margin: 2rem auto;
  }
`;

const PageLayout: FC<LayoutProps> = ({ children, name, description }) => {
  const open = useSelector(selectOpen);
  const dispatch = useDispatch();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <LayoutWrapper data-scroll-section>
      <Head>
        <title>{name}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/images/cover.png" />
      </Head>
      <div
        onClick={() => dispatch(toggleSidebar())}
        style={{ display: open ? "block" : "none" }}
        className="backdrop"
      ></div>

      {isBigScreen && <Navbar />}
      {isTabletOrMobile && <NavbarMobile />}

      <Sidebar open={open}>
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
              <li>Contact Us</li>
            </ul>

            <Button className="btn" variant="primary">
              <Link href="/signup">
                <a>&nbsp; Sign Up &nbsp;</a>
              </Link>
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>

      <MainContainer>{children}</MainContainer>
      <Footer />
    </LayoutWrapper>
  );
};

export default dynamic(() => Promise.resolve(PageLayout), { ssr: false });
