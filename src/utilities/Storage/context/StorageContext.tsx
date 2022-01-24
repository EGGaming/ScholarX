import { Reducer, UseReducer } from '@context/helpers';
import React from 'react';
import { StorageContextActions, StorageContextState } from './StorageContext.types';

export const StorageContext = React.createContext<UseReducer<StorageContextState, StorageContextActions>>([] as any);
export const StorageDispatchContext = React.createContext<React.Dispatch<StorageContextActions>>({} as any);
export const useStorage = () => React.useContext(StorageContext);
export const useStorageDispatch = () => React.useContext(StorageDispatchContext);

const reducer: Reducer<StorageContextState, StorageContextActions> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      state++;
      return state;
    default:
      return state;
  }
};

export const StorageReducer = () => React.useReducer(reducer, 0);
