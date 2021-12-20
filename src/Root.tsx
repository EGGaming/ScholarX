import BottomTab from '@navigators/BottomTab/BottomTab';
import React from 'react';
import Dashboard from '@screens/Dashboard/Dashboard';
import GradeBook from '@screens/GradeBook/GradeBook';
import Profile from '@screens/Profile/Profile';
import { useAppTheme } from '@theme/core';
import Header from '@shared/@react-navigation/Header';
import TabIcon from '@shared/@react-navigation/TabIcon';

const Root: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <BottomTab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: TabIcon('FontAwesome5', 'chart-area'),
          tabBarLabel: 'Dashboard',
        }}
      />
      <BottomTab.Screen
        name='GradeBook'
        component={GradeBook}
        options={{ tabBarIcon: TabIcon('FontAwesome5', 'clipboard-list'), tabBarLabel: 'Report Card' }}
      />
      <BottomTab.Screen
        name='Profile'
        component={Profile}
        options={{ tabBarIcon: TabIcon('FontAwesome5', 'user-graduate'), tabBarLabel: 'My Profile' }}
      />
    </BottomTab.Navigator>
  );
};

export default Root;
