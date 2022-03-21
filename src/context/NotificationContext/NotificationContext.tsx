import React from 'react';
import {
  NotificationContextActions,
  NotificationContextState,
} from '@context/NotificationContext/NotificationContext.types';
import { Reducer, UseReducer } from '../helpers';
import Storage from '@utilities/Storage';

const reducer: Reducer<NotificationContextState, NotificationContextActions> = (state, action) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATIONS':
      return {
        ...state,
        unreadNotifications: action.messages.filter((message) => !message.isRead()),
        notifications: action.messages,
      };
    case 'MARK_AS_READ': {
      const notificationsModified = [...state.notifications, action.message];
      return {
        ...state,
        unreadNotifications: notificationsModified.filter((msg) => msg.isRead()),
        notifications: notificationsModified,
      };
    }
    case 'MARK_ALL_READ': {
      const modified = [...state.notifications];
      for (const notification of modified) {
        if (!notification.isRead()) notification.markAsRead();
      }
      return {
        ...state,
        notifications: modified,
        unreadNotifications: [],
      };
    }
    case 'INITIALIZE':
      return action.state;
    default:
      return state;
  }
};

const NotificationContext = React.createContext<UseReducer<NotificationContextState, NotificationContextActions>>(
  {} as any
);
const NotificationDispatch = React.createContext<React.Dispatch<NotificationContextActions>>({} as any);

export const useNotificationReducer = () => React.useContext(NotificationContext);
export const useNotificationDispatch = () => React.useContext(NotificationDispatch);

const INITIAL_STATE: NotificationContextState = {
  unreadNotifications: [],
  notifications: [],
};

const NotificationContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  Storage.useSyncEffect('NotificationContext', state, dispatch);

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      <NotificationDispatch.Provider value={dispatch}>{children}</NotificationDispatch.Provider>
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
