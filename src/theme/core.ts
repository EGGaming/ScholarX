import { DefaultTheme } from 'styled-components';
import { AppDefinedColors, UserDefinedColors } from './index';
import { useColorScheme } from 'react-native';

const PaletteConstants: DefaultTheme['palette']['constants'] = {
  RED: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
};

const PaletteDefaults: AppDefinedColors<DefaultTheme['palette']> = {
  constants: PaletteConstants,
  typography: {},
};

const lightTheme: DefaultTheme = {
  mode: 'light',
  palette: {
    ...PaletteDefaults,
    primary: {
      dark: '#001acb',
      main: '#0055FF',
      light: '#c7cdff',
    },
    secondary: {
      dark: '#fe7f00',
      main: '#ffaa00',
      light: '#f8e814',
    },
    success: {
      dark: '#00ea00',
      main: '#1bff00',
      light: '#a5ff90',
    },
    error: {
      dark: '#be2629',
      main: '#dd3636',
      light: '#e85050',
    },
    warning: {
      dark: '#f67716',
      main: '#ffd22c',
      light: '#ffec70',
    },
    background: {
      default: '#303b75',
      paper: '#303b75',
    },
  },
};

export const useTheme = (theme: DefaultTheme): DefaultTheme => {
  const colorScheme = useColorScheme();

  switch (colorScheme) {
    default:
    case 'light':
      return {
        ...theme,
        mode: 'light',
      };
    case 'dark':
      return {
        ...theme,
        mode: 'dark',
      };
  }
};
