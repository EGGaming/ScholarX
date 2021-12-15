import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContextProvider from '@context/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import Root from 'RootComponent';
import SessionContextProvider from '@context/SessionContext';

export default function App() {
  return (
    <SessionContextProvider>
      <AppContextProvider>
        <StatusBar />
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </AppContextProvider>
    </SessionContextProvider>
  );
}
