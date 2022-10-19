import "@/styles/global.css";
import { useRef } from "react";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import GlobalStyles from "@/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/Theme";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { AnimatePresence } from "framer-motion";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        {/*  */}
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },

            // ... all available Locomotive Scroll instance options
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <AnimatePresence>
            <main data-scroll-container ref={containerRef}>
              {/* ...your app */}
              <Component {...pageProps} />
            </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>

        {/*  */}
      </ThemeProvider>
    </Provider>
  );
}
