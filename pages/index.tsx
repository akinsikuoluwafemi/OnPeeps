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

export default function Home() {
  // const count = useSelector(selectValue);

  // const dispatch = useDispatch();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <PageLayout
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
  );
}
