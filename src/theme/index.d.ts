import 'styled-components';

interface ColorConstant {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      constants: {};
      primary: {
        dark: string;
        main: string;
        light: string;
      };
      secondary: {
        dark: string;
        main: string;
        light: string;
      };
      success: {
        dark: string;
        main: string;
        light: string;
      };
      error: {
        dark: string;
        main: string;
        light: string;
      };
      warning: {
        dark: string;
        main: string;
        light: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
  }
}
