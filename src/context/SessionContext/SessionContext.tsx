import { SessionContextActions, SessionContextState } from './SessionContext.types';
import React from 'react';
import { Reducer, UseReducerProvider } from '../helpers';

const reducer: Reducer<SessionContextState, SessionContextActions> = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { StudentInfo } = action.user;
      return {
        validSession: true,
        name: StudentInfo.FormattedName[0],
        nickname: StudentInfo.NickName[0],
        address: StudentInfo.Address[0],
        email: StudentInfo.EMail[0],
        gender: StudentInfo.Gender[0],
        grade: StudentInfo.Grade[0],
        phoneNumber: StudentInfo.Phone[0],
        id: StudentInfo.PermID[0],
        photo: StudentInfo.Photo[0],
      };
    case 'LOGOUT':
      return { validSession: false };

    default:
      return state;
  }
};

const SessionContext = React.createContext<UseReducerProvider<SessionContextState, SessionContextActions>>([] as any);

export const useSessionReducer = () => React.useContext(SessionContext);

const INITIAL_STATE: SessionContextState = {
  validSession: false,
};

const SessionContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return <SessionContext.Provider value={[state, dispatch]}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
