import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Ubuntu', sans-serif;
        overflow-x: hidden;
        // overflow: hidden;
    }
    h1,h2,h3,h4,h5,h6{
        margin: 0;
        padding: 0;
    }
    *{
        color: inherit;
        text-decoration: none;
    }

    ul, li{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    a{
        text-decoration: none;
    }

`;

export default GlobalStyles;
