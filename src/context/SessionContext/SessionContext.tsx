import { SessionContextActions, SessionContextState } from './SessionContext.types';
import React from 'react';
import { Reducer, UseReducer } from '../helpers';
import Storage from '@utilities/Storage';

const reducer: Reducer<SessionContextState, SessionContextActions> = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loggedIn: true,
      };
    case 'LOGOUT':
      return { loggedIn: false };
    default:
      return state;
  }
};

const SessionContext = React.createContext<UseReducer<SessionContextState, SessionContextActions>>([] as any);
const SessionDispatchContext = React.createContext<React.Dispatch<SessionContextActions>>({} as any);

export const useSessionReducer = () => React.useContext(SessionContext);
export const useSessionDispatch = () => React.useContext(SessionDispatchContext);

const INITIAL_STATE: SessionContextState = {
  loggedIn: false,
};

const SessionContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <SessionContext.Provider value={[state, dispatch]}>
      <SessionDispatchContext.Provider value={dispatch}>{children}</SessionDispatchContext.Provider>
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
