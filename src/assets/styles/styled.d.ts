import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      family: {
        [x: string]: string;
      };
      weight: {
        [x: string]: string;
      };
    };
    color: {
      [x: string]: string;
    };
  }
}
