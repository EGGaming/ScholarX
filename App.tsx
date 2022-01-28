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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HoldMenuProvider } from 'react-native-hold-menu';
import Icon from '@components/Icon/Icon';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function App() {
  const theme = useAppTheme();
  const navigationTheme = useNavigationTheme();
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HoldMenuProvider theme={theme.mode as any} iconComponent={FeatherIcon}>
          <Storage.Provider>
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
          </Storage.Provider>
        </HoldMenuProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
