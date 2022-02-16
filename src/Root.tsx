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
import { useNotificationDispatch, useNotificationReducer } from '@context/NotificationContext/NotificationContext';
import Icon from '@components/Icon/Icon';
import { Status } from '@utilities/StudentVue';
import EventsScreen from '@screens/Events/Events';
import Space from '@components/Space/Space';
import ClassViewer from '@screens/ClassViewer/ClassViewer';
import AssignmentViewer from '@screens/AssignmentViewer/AssignmentViewer';
import AssignmentFilters from '@screens/AssignmentFilters/AssignmentFilters';

const Root: React.FC = () => {
  const ready = Storage.initialize();
  const [client] = useStudentVue();
  const [notifications, dispatch] = useNotificationReducer();
  const markAllRead = React.useCallback(async () => {
    dispatch({ type: 'MARK_ALL_READ' });
    await Promise.all(notifications.notifications.map((msg) => client.updateMessage(msg)));
  }, [dispatch, notifications]);

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
          headerRight: () => <Button title='Mark all Read' onPress={markAllRead} size='small' />,
        }}
      />
      <RootStack.Screen
        name='Events'
        component={EventsScreen}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
          headerRight: () => (
            <Space spacing={1}>
              <IconButton icon={<Icon bundle='MaterialCommunityIcons' name='calendar-clock' />} onPress={() => {}} />
              <IconButton icon={<Icon bundle='Feather' name='filter' />} onPress={() => {}} />
            </Space>
          ),
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
      <RootStack.Screen
        name='ClassViewer'
        component={ClassViewer}
        options={({ navigation }) => ({
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
          headerRight: (props) => (
            <IconButton
              icon={<Icon bundle='Feather' name='filter' />}
              onPress={() => {
                navigation.navigate('AssignmentFilters');
              }}
            />
          ),
          headerBackVisible: true,
        })}
      />
      <RootStack.Screen
        name='AssignmentViewer'
        component={AssignmentViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
          headerBackVisible: true,
        }}
      />
      <RootStack.Screen
        name='AssignmentFilters'
        component={AssignmentFilters}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: 'Filter',
          headerBackVisible: true,
        }}
      />
    </RootStack.Navigator>
  );
};

export default Root;
