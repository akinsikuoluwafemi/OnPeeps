import dynamic from "next/dynamic";
import Head from "next/head";
import React, { FC } from "react";
import styled from "styled-components";
import AppNavbar from "./AppNavbar";

interface AppLayoutProps {
  children: React.ReactNode;
  name: string;
  description?: string;
  style?: React.CSSProperties;
}

const MainContainer = styled.div`
  margin: 0 auto;
`;

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  // width: 100%;
  margin: 0 auto;
  border: 1px solid transparent;
  .app-navbar {
    margin: 0 auto;

    transition: all 0.3s ease-in-out;

    border: 1px solid #e5e5e5;

    flex: 0.2 1 auto;
    overflow: hidden;
    position: fixed;
    height: 100vh;
    width: 250px;
    @media (max-width: 768px) {
      width: 74px;
    }
  }

  .app-main {
    width: 100%;
    flex: 0.8 0 auto;
    // background-color: blue;
    min-height: auto;

    padding-left: 260px;
    border: none;
    // text-align: center;
    // transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
      // width: 100vw;
      padding-left: 79px;
      min-height: auto;
    }
  }
`;

const AppLayout: FC<AppLayoutProps> = ({ children, name, description }) => {
  return (
    <AppWrapper>
      <Head>
        <title>{name}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/images/cover.png" />
      </Head>

      <div className="app-navbar">
        <AppNavbar />
      </div>
      <div className="app-main">
        <MainContainer>{children}</MainContainer>
      </div>
    </AppWrapper>
  );
};

export default dynamic(() => Promise.resolve(AppLayout), { ssr: false });
