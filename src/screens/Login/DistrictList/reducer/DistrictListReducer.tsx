import { Reducer } from '@context/helpers';
import { DistrictListActions, DistrictListState } from '@screens/Login/DistrictList/reducer/DistrictListReducer.types';
import React from 'react';

const INITIAL_STATE: DistrictListState = {
  error: '',
  loading: true,
};

const reducer: Reducer<DistrictListState, DistrictListActions> = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'RESET_STATE':
      return INITIAL_STATE;
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const useDistrictListReducer = () => React.useReducer(reducer, INITIAL_STATE);
export default useDistrictListReducer;
