import { createGlobalStyle } from 'styled-components';
import MontserratExtraBold from '../fonts/Montserrat-ExtraBold.ttf';
import MontserratBold from '../fonts/Montserrat-Bold.ttf';
import MontserratSemiBold from '../fonts/Montserrat-SemiBold.ttf';
import MontserratMedium from '../fonts/Montserrat-Medium.ttf';
import MontserratRegular from '../fonts/Montserrat-Regular.ttf';
import MontserratLight from '../fonts/Montserrat-Light.ttf';

const GlobalStyle = createGlobalStyle`
    *,*::before,*::after{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin:0;
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratExtraBold}) format('truetype');
        font-weight: 800;
        font-style:normal; 
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratBold}) format('truetype');
        font-weight: 700;
        font-style:normal; 
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratSemiBold}) format('truetype');
        font-weight: 600;
        font-style:normal; 
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratMedium}) format('truetype');
        font-weight: 500;
        font-style:normal; 
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratRegular}) format('truetype');
        font-weight: 400;
        font-style:normal; 
    }

    @font-face{
        font-family: "Montserrat";
        src: url(${MontserratLight}) format('truetype');   
        font-weight: 300;
        font-style:normal; 
    }

    body, input, textarea, button,select,a{
        font-family: ${({ theme }) => theme.font.family.montserrat}
    }

    button{
        background:none;
        border:none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    a{
        -webkit-tap-highlight-color: transparent;
    }

    :root {
    --app-height: 100%;
    }

    html{
        font-size:62.5%;
    }

    body{
        margin:0;
        padding:0;
        font-family:${({ theme }) => theme.font.family.montserrat};
        padding: 0;
        overflow: hidden;
        height: 100vh;

        @media not all and (hover:hover) {
        height: var(--app-height);
        }
    }
`;

export default GlobalStyle;
