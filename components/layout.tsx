import Navbar from "./Navbar";
import Footer from "./Footer";
import { FC } from "react";
import styled from "styled-components";
import Head from "next/head";

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0 3rem;
`;

interface LayoutProps {
  children: React.ReactNode;
  name: string;
}

const PageLayout: FC<LayoutProps> = ({ children, name }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/images/cover.png" />
      </Head>
      <Navbar />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default PageLayout;
