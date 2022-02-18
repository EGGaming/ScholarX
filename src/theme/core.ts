import { DefaultTheme } from 'styled-components';
import React from 'react';
import { AppDefinedColors, UserDefinedColors } from './core.types';
import { DefaultTheme as NavigationTheme, Theme as INavigationTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { css } from 'styled-components/native';

const TypographyDefaults: DefaultTheme['typography'] = {
  constants: {
    bold: 700,
    semibold: 600,
    regular: 400,
  },
  body: css`
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0.5px;
  `,
  h1: css`
    font-size: 40px;
    line-height: 50px;
    letter-spacing: -1px;
  `,
  h2: css`
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -0.4px;
  `,
  h3: css`
    font-size: 22px;
    line-height: 30px;
    letter-spacing: -0.2px;
  `,
  button: css`
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-weight: 700;
  `,
  'small-button': css`
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 700;
  `,
  tab: css`
    font-size: 10px;
  `,
  caption: css`
    line-height: 20.25px;
    font-size: 12px;
    letter-spacing: 1px;
  `,
  body2: css`
    font-size: 15.75px;
    line-height: 24px;
    letter-spacing: 0.6px;
  `,
};

const PaletteConstants: DefaultTheme['palette']['constants'] = {
  GRAY: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

const PaletteDefaults: AppDefinedColors<DefaultTheme['palette']> = {
  constants: PaletteConstants,
  toColorValue: () => '',
  getContrastText: () => '',
  toRGBA: () => '',
};

const ThemeDefaults: DefaultTheme = {
  borderRadius: 16,
  mode: 'light',
  typography: TypographyDefaults,
  spacing: (...n) => {
    switch (n.length) {
      case 1:
      default:
        return `${n[0] * 8}px`;
      case 2:
        return `${n[0] * 8}px ${n[1] * 8}px`;
      case 3:
        return `${n[0] * 8}px ${n[1] * 8}px ${n[2] * 8}px`;
      case 4:
        return `${n[0] * 8}px ${n[1] * 8}px ${n[2] * 8}px ${n[3] * 8}px`;
    }
  },
  palette: {
    ...PaletteDefaults,
    primary: {
      dark: '',
      main: '',
      light: '',
    },
    secondary: {
      dark: '',
      main: '',
      light: '',
    },
    success: {
      dark: '',
      main: '',
      light: '',
    },
    warning: {
      dark: '',
      main: '',
      light: '',
    },
    error: {
      dark: '',
      main: '',
      light: '',
    },
    background: {
      default: '',
      paper: '',
    },
    text: {
      primary: '',
      secondary: '',
      disabled: '',
    },
    action: {
      disabled: '',
      disabledBackground: '',
      disabledOpacity: 0,
    },
    divider: '',
  },
};

const lightTheme: DefaultTheme = {
  ...ThemeDefaults,
  mode: 'light',
  typography: TypographyDefaults,
  palette: {
    ...ThemeDefaults.palette,
    primary: {
      dark: '#193fe6',
      main: '#2e54ff',
      light: '#a4aeff',
    },
    secondary: {
      dark: '#d96100',
      main: '#d97e00',
      light: '#da8e00',
    },
    background: {
      default: '#FAFAFA',
      paper: '#fff',
    },
    success: {
      light: '#4caf50',
      dark: '#1b5e20',
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
};

const darkTheme: DefaultTheme = {
  ...ThemeDefaults,
  mode: 'dark',
  typography: TypographyDefaults,
  palette: {
    ...ThemeDefaults.palette,
    primary: {
      dark: '#425189',
      main: '#a4aeff',
      light: '#c9ceff',
    },
    secondary: {
      dark: '#e9d481',
      main: '#f1e5b7',
      light: '#f8f5e7',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#222',
      paper: '#333',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.70)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    action: {
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};

const getAppliedTheme = (): DefaultTheme => {
  const colorScheme = useColorScheme();

  switch (colorScheme) {
    case 'dark':
      return darkTheme;
    default:
    case 'light':
      return lightTheme;
  }
};

export const useAppTheme = (): DefaultTheme => {
  const theme = getAppliedTheme();

  return {
    ...theme,
    palette: {
      ...theme.palette,
      getContrastText: (hex) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        if (brightness >= 128) return '#000000';
        return '#ffffff';
      },
      toColorValue: (param): string => {
        switch (param) {
          case 'textSecondary':
            return theme.palette.text.secondary;
          default:
          case 'textPrimary':
            return theme.palette.text.primary;
          case 'primary':
          case 'secondary':
          case 'success':
          case 'warning':
          case 'error':
            return theme.palette[param].main;
          case 'disabled':
            return theme.palette.text.disabled;
          case 'inherit':
            return param;
        }
      },
      toRGBA: (hex, opacity): string => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      },
    },
  };
};

export const useNavigationTheme = (): INavigationTheme => {
  const theme = useAppTheme();
  const isDarkMode = React.useMemo<boolean>(() => {
    switch (theme.mode) {
      case 'dark':
        return true;
      default:
      case 'light':
        return false;
    }
  }, [theme]);

  return {
    ...NavigationTheme,
    dark: isDarkMode,
    colors: {
      ...NavigationTheme.colors,
      primary: theme.palette.primary.main,
      background: theme.palette.background.default,
      card: theme.palette.background.paper,
      text: theme.palette.text.primary,
      border: theme.palette.background.paper,
    },
  };
};
