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
import Schedule from '@screens/Schedule/Schedule';
import { useAssignmentFilterDispatch } from '@context/AssignmentFilterContext/AssignmentFilterContext';
import FilterCategories from '@screens/FilterCategories/FilterCategories';
import CategoryWeighingViewer from '@screens/CategoryWeighingViewer/CategoryWeighingViewer';

const Root: React.FC = () => {
  const ready = Storage.initialize();
  const [client] = useStudentVue();
  const [notifications, dispatch] = useNotificationReducer();
  const filtersDispatch = useAssignmentFilterDispatch();
  const markAllRead = React.useCallback(async () => {
    dispatch({ type: 'MARK_ALL_READ' });
    await Promise.all(notifications.notifications.map((msg) => client.updateMessage(msg)));
  }, [dispatch, notifications]);

  if (!ready) return <AppLoading />;

  return (
    <RootStack.Navigator initialRouteName='Login' screenOptions={{ presentation: 'card' }}>
      <RootStack.Screen name='Main' component={Main} options={{ headerShown: false }} />
      <RootStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <RootStack.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerRight: () => <Button title='Mark all Read' onPress={markAllRead} size='small' />,
        }}
      />
      <RootStack.Screen name='Events' component={EventsScreen} />
      <RootStack.Screen
        name='NotificationViewer'
        component={NotificationViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
        }}
      />
      <RootStack.Screen
        name='EventViewer'
        component={EventViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
        }}
      />
      <RootStack.Screen name='ClassViewer' component={ClassViewer} />
      <RootStack.Screen
        name='AssignmentViewer'
        component={AssignmentViewer}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: '',
        }}
      />
      <RootStack.Screen
        name='AssignmentFilters'
        component={AssignmentFilters}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerRight: () => (
            <Button
              title='Reset Filters'
              size='small'
              onPress={() => {
                filtersDispatch({ type: 'RESET_FILTERS' });
              }}
            />
          ),
          headerTitle: 'Filter',
        }}
      />
      <RootStack.Screen
        name='Schedule'
        component={Schedule}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: "Today's Schedule",
        }}
      />
      <RootStack.Screen
        name='FilterCategories'
        component={FilterCategories}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerTitle: 'Add Categories to Filter',
        }}
      />
      <RootStack.Screen name='CategoryWeighingViewer' component={CategoryWeighingViewer} />
    </RootStack.Navigator>
  );
};

export default Root;
