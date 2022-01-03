import React from 'react';
import {
  NotificationContextActions,
  NotificationContextState,
} from '@context/NotificationContext/NotificationContext.types';
import { Reducer, UseReducer } from '../helpers';

const reducer: Reducer<NotificationContextState, NotificationContextActions> = (state, action) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATIONS':
      return {
        ...state,
        unreadNotifications: action.messages.filter((message) => !JSON.parse(message.$.Read)),
        notifications: action.messages,
      };

    default:
      return state;
  }
};

const NotificationContext = React.createContext<UseReducer<NotificationContextState, NotificationContextActions>>(
  {} as any
);

export const useNotificationReducer = () => React.useContext(NotificationContext);

const INITIAL_STATE: NotificationContextState = {
  unreadNotifications: [],
  notifications: [],
};

const NotificationContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return <NotificationContext.Provider value={[state, dispatch]}>{children}</NotificationContext.Provider>;
};

export default NotificationContextProvider;
