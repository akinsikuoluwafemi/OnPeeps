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

export default function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <AnimatePresence>
          <main
            // style={{ zIndex: "100" }}
            // data-scroll-container
            ref={containerRef}
          >
            {/* ...your app */}
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  );
}
