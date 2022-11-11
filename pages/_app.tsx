import "@/styles/global.css";
import { useRef, useState } from "react";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import GlobalStyles from "@/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/Theme";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { AnimatePresence } from "framer-motion";
// import "locomotive-scroll/dist/locomotive-scroll.css";
import "react-toastify/dist/ReactToastify.css";

import React, { Component } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <AnimatePresence>
          <main>
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
