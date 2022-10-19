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

export default function Home() {
  // const count = useSelector(selectValue);

  // const dispatch = useDispatch();

  return (
    <PageLayout
      name="OnPeeps / A fast, safe and reliable way to facilitate exchanged acts of kindness.
    "
    >
      {/* <img style={{ height: "40px", width: "40px" }} src="images/cover.png" /> */}

      <HeroSection />
      <HomeStepsSection />
      <HomeSendRequestMockup />
      <HomeMapMockup />
      <HomeVideoMockup />
    </PageLayout>
  );
}
