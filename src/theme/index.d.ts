import { ColorSchemeName } from 'react-native';
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

type UserDefinedColors<T extends DefaultTheme['palette']> = {
  [K in keyof T as T[K] extends { dark: string; main: string; light: string } | { default: string; paper: string }
    ? K
    : never]: T[K];
};

type AppDefinedColors<T extends DefaultTheme['palette']> = {
  [K in keyof T as T[K] extends { dark: string; main: string; light: string } | { default: string; paper: string }
    ? never
    : K]: T[K];
};

type TypographyPalette = {
  textPrimary: string;
  textSecondary: string;
  disabled: string;
  hint: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ColorSchemeName;
    palette: {
      constants: {
        RED: ColorConstant;
      };
      typography: TypographyPalette;
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
