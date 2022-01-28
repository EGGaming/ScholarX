import BottomTab from '@navigators/BottomTab/BottomTab';
import React from 'react';
import Dashboard from '@screens/Main/Dashboard/Dashboard';
import GradeBook from '@screens/Main/GradeBook/GradeBook';
import Profile from '@screens/Main/Profile/Profile';
import Header from '@shared/@react-navigation/Header/BottomTabHeader';
import TabIcon from '@shared/@react-navigation/TabIcon';
import { useFocusEffect } from '@react-navigation/native';
import { useNotificationDispatch, useNotificationReducer } from '@context/NotificationContext/NotificationContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import BottomTabComponent from '@shared/@react-navigation/BottomTab/BottomTab';
import Calendar from './Calendar/Calendar';

const Main: React.FC = () => {
  const dispatch = useNotificationDispatch();
  const [client] = useStudentVue();
  React.useEffect(() => {
    (async () => {
      const messages = await client.messages();
      dispatch({ type: 'FETCH_NOTIFICATIONS', messages: messages });
    })();
    // const interval = setInterval(async () => {
    //   const messages = await client.messages();
    //   dispatch({ type: 'FETCH_NOTIFICATIONS', messages: messages });
    // }, 60 * 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <BottomTab.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
      tabBar={(props) => <BottomTabComponent {...props} />}>
      <BottomTab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: TabIcon('Feather', 'home'),
          tabBarLabel: 'Dashboard',
        }}
      />
      <BottomTab.Screen
        name='GradeBook'
        component={GradeBook}
        options={{ tabBarIcon: TabIcon('Feather', 'clipboard'), tabBarLabel: 'Report Card' }}
      />

      <BottomTab.Screen
        name='Calendar'
        component={Calendar}
        options={{ tabBarIcon: TabIcon('Feather', 'calendar'), tabBarLabel: 'School Calendar' }}
      />
      <BottomTab.Screen
        name='Profile'
        component={Profile}
        options={{ tabBarIcon: TabIcon('Feather', 'user'), tabBarLabel: 'My Profile' }}
      />
    </BottomTab.Navigator>
  );
};

export default Main;
