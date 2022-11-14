import "@/styles/global.css";
import { useRef, useState } from "react";
import type { AppProps } from "next/app";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import GlobalStyles from "@/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/Theme";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { AnimatePresence } from "framer-motion";
// import "locomotive-scroll/dist/locomotive-scroll.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <AnimatePresence>
            <main>
              <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </main>
          </AnimatePresence>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
