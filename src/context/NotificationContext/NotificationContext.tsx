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
        unreadNotifications: action.messages.filter((message) => !JSON.parse(message.$.Read)),
        notifications: action.messages,
      };
    case 'MARK_AS_READ': {
      const objInArray = state.notifications.filter((msg) => msg.$.ID === action.message.$.ID)[0];
      const index = state.notifications.indexOf(objInArray);
      const notificationsModified = state.notifications;
      notificationsModified[index].$.Read = 'true';
      return {
        ...state,
        unreadNotifications: notificationsModified.filter((msg) => !JSON.parse(msg.$.Read)),
        notifications: notificationsModified,
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
