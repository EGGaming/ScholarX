import React from 'react';
import { Reducer } from './types';
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

const initialState: AppContextState = {
  username: '',
  password: '',
  districtUrl: '',
};

const AppContext = React.createContext<[s: AppContextState, d: React.Dispatch<AppContextActions>]>({} as any);

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
