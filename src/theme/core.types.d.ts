import { ColorSchemeName } from 'react-native';
import { css, DefaultTheme } from 'styled-components/native';
import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components';
import 'styled-components';

export type AppColors = 'primary' | 'secondary' | 'inherit' | 'warning' | 'success' | 'error';
export type TypographyColors = 'textPrimary' | 'textSecondary' | 'disabled' | AppColors;
export type ButtonVariants = 'outlined' | 'text' | 'contained';

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
  [K in keyof T as T[K] extends
    | ColorPalette
    | { default: string; paper: string }
    | TypographyPalette
    | string
    | ActionPalette
    ? K
    : never]: T[K];
};

type AppDefinedColors<T extends DefaultTheme['palette']> = {
  [K in keyof T as T[K] extends
    | TypographyPalette
    | { default: string; paper: string }
    | ColorPalette
    | string
    | ActionPalette
    ? never
    : K]: T[K];
};

type TypographyPalette = {
  primary: string;
  secondary: string;
  disabled: string;
};

type ColorPalette = {
  dark: string;
  main: string;
  light: string;
};

type BackgroundPalette = {
  default: string;
  paper: string;
};

type ActionPalette = {
  disabled: string;
  disabledBackground: string;
  disabledOpacity: number;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ColorSchemeName;
    typography: {
      constants: {
        bold: number;
        semibold: number;
        regular: number;
      };
      body2: FlattenSimpleInterpolation;
      body: FlattenSimpleInterpolation;
      h1: FlattenSimpleInterpolation;
      h2: FlattenSimpleInterpolation;
      h3: FlattenSimpleInterpolation;
      button: FlattenSimpleInterpolation;
      'small-button': FlattenSimpleInterpolation;
      tab: FlattenSimpleInterpolation;
      caption: FlattenSimpleInterpolation;
    };
    palette: {
      getContrastText: (hex: string) => string;
      toColorValue: (param: TypographyColors) => string;
      toRGBA: (hex: string, opacity: number) => string;
      constants: {
        GRAY: ColorConstant;
      };
      text: TypographyPalette;
      primary: ColorPalette;
      secondary: ColorPalette;
      success: ColorPalette;
      warning: ColorPalette;
      error: ColorPalette;
      background: BackgroundPalette;
      divider: string;
      action: ActionPalette;
    };
    borderRadius: number;
    spacing: (...n: number[]) => string;
  }
}

export type TypographyComponent<S = DefaultTheme['typography']> = keyof Omit<
  S,
  {
    [K in keyof S]: S[K] extends FlattenSimpleInterpolation ? never : K;
  }[keyof S]
>;
