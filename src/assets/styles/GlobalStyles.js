import { createGlobalStyle } from 'styled-components';
import DancingScriptMedium from '../fonts/DancingScript-Medium.ttf';
import MontserratExtraBold from '../fonts/Montserrat-ExtraBold.ttf';
import MontserratBold from '../fonts/Montserrat-Bold.ttf';
import MontserratSemiBold from '../fonts/Montserrat-SemiBold.ttf';
import MontserratMedium from '../fonts/Montserrat-Medium.ttf';
import MontserratRegular from '../fonts/Montserrat-Regular.ttf';
import MontserratLight from '../fonts/Montserrat-Light.ttf';
import { devices } from '../styles/devices';
const GlobalStyle = createGlobalStyle`
    *,*::before,*::after{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    @font-face{
        font-family: 'Dancing Script';
        src: url(${DancingScriptMedium}) format('truetype');
        font-weight: 500;
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

    body, input, textarea, button,select{
        font-family: ${({ theme }) => theme.font.family.montserrat}
    }

    button{
        background:none;
        border:none;
    }

    html{
        font-size:62.5%;

        @media ${devices.tabletVer}{
            font-size: 75%;
        }
    }

    body{
        margin:0;
        padding:0;
        font-family:${({ theme }) => theme.font.family.montserrat};
    }
`;

export default GlobalStyle;
