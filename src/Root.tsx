import { StatusBar } from 'expo-status-bar';
import BottomTab from '@navigators/BottomTab';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import StudentVue, { Client } from './utilities/StudentVue';
import Dashboard from '@screens/Dashboard';
import GradeBook from '@screens/GradeBook';
import Profile from '@screens/Profile';

const Root: React.FC = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Dashboard' component={Dashboard} options={{ tabBarLabel: 'DB' }} />
      <BottomTab.Screen name='GradeBook' component={GradeBook} options={{ tabBarLabel: 'GB' }} />
      <BottomTab.Screen name='Profile' component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </BottomTab.Navigator>
  );
};

export default Root;
