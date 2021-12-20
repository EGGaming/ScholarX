import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContextProvider from '@context/AppContext/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import Root from 'RootComponent';
import SessionContextProvider from '@context/SessionContext/SessionContext';
import { ThemeProvider } from 'styled-components';
import { useAppTheme, useNavigationTheme } from '@theme/core';

export default function App() {
  const theme = useAppTheme();
  const navigationTheme = useNavigationTheme();
  return (
    <ThemeProvider theme={theme}>
      <SessionContextProvider>
        <AppContextProvider>
          <StatusBar />
          <NavigationContainer theme={navigationTheme}>
            <Root />
          </NavigationContainer>
        </AppContextProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
