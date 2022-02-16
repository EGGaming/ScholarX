import { Reducer, UseReducer } from '@context/helpers';
import React from 'react';
import {
  AssignmentFilterContextActions,
  AssignmentFilterContextState,
  FieldVisibility,
} from './AssignmentFilterContext.types';

const AssignmentFilterContext = React.createContext<
  UseReducer<AssignmentFilterContextState, AssignmentFilterContextActions>
>({} as any);
const AssignmentFilterDispatchContext = React.createContext<React.Dispatch<AssignmentFilterContextActions>>({} as any);

const reducer: Reducer<AssignmentFilterContextState, AssignmentFilterContextActions> = (state, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

const INITIAL_STATE: AssignmentFilterContextState = {
  withDropbox: false,
};

export const useAssignmentFilter = () => React.useContext(AssignmentFilterContext);
export const useAssignmentFilterDispatch = () => React.useContext(AssignmentFilterDispatchContext);

const AssignmentFilterProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <AssignmentFilterContext.Provider value={[state, dispatch]}>
      <AssignmentFilterDispatchContext.Provider value={dispatch}>{children}</AssignmentFilterDispatchContext.Provider>
    </AssignmentFilterContext.Provider>
  );
};

export default AssignmentFilterProvider;
