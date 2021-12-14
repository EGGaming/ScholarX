import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContextProvider from '@context/AppContext';
import Root from 'RootComponent';

export default function App() {
  return (
    <AppContextProvider>
      <StatusBar />
      <Root />
    </AppContextProvider>
  );
}
