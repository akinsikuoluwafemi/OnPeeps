import Head from "next/head";
import Image from "next/image";
import styles from "@/pages/index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectValue } from "../slices/counterSlice";
import GG from "../public/images/cover.png";
import Header from "@/components/Navbar";
import PageLayout from "@/components/layout";
import HeroSection from "sections/HeroSection";
import Navbar from "@/components/Navbar";
import HomeStepsSection from "sections/HomeStepsSection";
import HomeSendRequestMockup from "sections/HomeSendRequestMockup";
import HomeMapMockup from "sections/HomeMapMockup";
import HomeVideoMockup from "sections/HomeVideoMockup";
import HomeSendRequestMockupMobile from "sections/HomeSendRequestMockupMobile";
import { useMediaQuery } from "react-responsive";
import HomeMapMockupMobile from "sections/HomeMapMockupMobile";
import HomeVideoMockupMobile from "sections/HomeVideoMockupMobile";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";

const SplashScreenLogo = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);

  }
  

`;

const SplashScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .logo {
    height: 100px;
    animation: ${SplashScreenLogo} 1s ease-in-out infinite;

    @media (max-width: 768px) {
      width: 350px;
      height: 150px;
    }
  }
`;

export default function Home() {
  // const count = useSelector(selectValue);

  // const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser({ user: null }));
    // console.log("changing user to empty");
  }, []);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [loading]);

  return (
    <>
      {loading ? (
        <SplashScreen>
          <img className="logo" src="/images/splash.png" alt="logo" />
        </SplashScreen>
      ) : (
        <PageLayout
          showFooter={true}
          style={{ overflow: "hidden", minHeight: "100vh" }}
          name="OnPeeps / A fast, safe and reliable way to facilitate exchanged acts of kindness.
    "
        >
          {/* <img style={{ height: "40px", width: "40px" }} src="images/cover.png" /> */}

          <HeroSection />
          <HomeStepsSection />

          {isBigScreen && <HomeSendRequestMockup />}
          {isTabletOrMobile && <HomeSendRequestMockupMobile />}

          {isBigScreen && <HomeMapMockup />}
          {isTabletOrMobile && <HomeMapMockupMobile />}

          {isBigScreen && <HomeVideoMockup />}
          {isTabletOrMobile && <HomeVideoMockupMobile />}
        </PageLayout>
      )}
    </>
  );
}
