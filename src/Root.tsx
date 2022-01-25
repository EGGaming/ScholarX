import React from 'react';
import RootStack from '@navigators/Root/Root';
import Main from '@screens/Main';
import Login from '@screens/Login';
import NotificationsScreen from '@screens/Notifications/Notifications';
import Header from '@shared/@react-navigation/Header';
import IconButton from '@components/IconButton/IconButton';
import Button from '@components/Button/Button';
import NotificationViewer from '@screens/NotificationViewer/NotificationViewer';
import AppLoading from 'expo-app-loading';
import Storage from '@utilities/Storage';
import { useStorage } from '@utilities/Storage/context/StorageContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import EventViewer from '@screens/EventViewer/EventViewer';

const Root: React.FC = () => {
  const ready = Storage.initialize();

  if (!ready) return <AppLoading />;

  return (
    <RootStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='Main' component={Main} />
      <RootStack.Screen name='Login' component={Login} />
      <RootStack.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerBackVisible: true,
          headerRight: () => <Button title='Mark all Read' onPress={() => {}} size='small' />,
        }}
      />
      <RootStack.Screen
        name='NotificationViewer'
        component={NotificationViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
          headerBackVisible: true,
        }}
      />
      <RootStack.Screen
        name='EventViewer'
        component={EventViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
          headerBackVisible: true,
        }}
      />
    </RootStack.Navigator>
  );
};

export default Root;
