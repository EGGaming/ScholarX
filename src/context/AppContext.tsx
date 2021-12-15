import React from 'react';
import { Reducer, UseReducerProvider } from './types';
import { AppContextState, AppContextActions } from './types/AppContext';

const reducer: Reducer<AppContextState, AppContextActions> = (state, action) => {
  switch (action.type) {
    case 'SETTER':
      return {
        ...state,
        [action.key]: action.payload,
      };
    case 'CLEAR_CREDENTIALS':
      return {
        ...state,
        username: '',
        password: '',
      };
    default:
      return state;
  }
};

const INITIAL_STATE: AppContextState = {
  username: '',
  password: '',
  districtUrl: '',
};

const AppContext = React.createContext<UseReducerProvider<AppContextState, AppContextActions>>({} as any);

export const useAppReducer = () => React.useContext(AppContext);

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
