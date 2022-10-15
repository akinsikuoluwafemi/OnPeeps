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

export default function Home() {
  // const count = useSelector(selectValue);

  // const dispatch = useDispatch();

  return (
    <PageLayout name="Home / Peepson">
      {/* <img style={{ height: "40px", width: "40px" }} src="images/cover.png" /> */}

      <HeroSection />
    </PageLayout>
  );
}
