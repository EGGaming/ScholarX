import Storage from '@utilities/Storage';
import React from 'react';
import { Reducer, UseReducer } from '../helpers';
import { AppContextState, AppContextActions } from './AppContext.types';

const reducer: Reducer<AppContextState, AppContextActions> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_STAY_SIGNED_IN':
      return {
        ...state,
        staySignedIn: !state.staySignedIn,
      };
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
    case 'SET_DISTRICT':
      return {
        ...state,
        districtName: action.district,
        districtUrl: action.url,
      };
    case 'CLEAR_DISTRICT':
      return {
        ...state,
        districtName: '',
        districtUrl: '',
      };
    case 'INITIALIZE':
      return action.state;
    default:
      return state;
  }
};

const INITIAL_STATE: AppContextState = {
  username: '',
  password: '',
  districtUrl: '',
  districtName: '',
  staySignedIn: false,
};

const AppContext = React.createContext<UseReducer<AppContextState, AppContextActions>>({} as any);
const AppDispatchContext = React.createContext<React.Dispatch<AppContextActions>>({} as any);

export const useAppReducer = () => React.useContext(AppContext);
export const useAppDispatch = () => React.useContext(AppDispatchContext);

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  Storage.useSyncEffect('AppContext', state, dispatch);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
