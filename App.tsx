import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContextProvider from '@context/AppContext/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import Root from 'RootComponent';
import SessionContextProvider from '@context/SessionContext/SessionContext';
import { ThemeProvider } from 'styled-components';
import { useAppTheme, useNavigationTheme } from '@theme/core';
import NotificationContextProvider from '@context/NotificationContext/NotificationContext';
import StudentVueClientProvider from '@context/StudentVueClientContext/StudentVueClientContext';
import Storage from '@utilities/Storage';

export default function App() {
  const theme = useAppTheme();
  const navigationTheme = useNavigationTheme();
  return (
    <Storage.Provider>
      <ThemeProvider theme={theme}>
        <StudentVueClientProvider>
          <NotificationContextProvider>
            <SessionContextProvider>
              <AppContextProvider>
                <StatusBar />
                <NavigationContainer theme={navigationTheme}>
                  <Root />
                </NavigationContainer>
              </AppContextProvider>
            </SessionContextProvider>
          </NotificationContextProvider>
        </StudentVueClientProvider>
      </ThemeProvider>
    </Storage.Provider>
  );
}
