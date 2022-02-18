import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { Reducer, UseReducer } from '@context/helpers';
import React from 'react';
import {
  AssignmentFilterContextActions,
  AssignmentFilterContextState,
  AssignmentFilterOfClassContextState,
  Order,
} from './AssignmentFilterContext.types';

const INITIAL_ASSIGNMENTFILTEROFCLASS_STATE: AssignmentFilterOfClassContextState = {
  withDropbox: false,
  orderType: Order.ASCENDING,
  selectedAssignments: [],
};

const AssignmentFilterOfClassContext = React.createContext<AssignmentFilterOfClassContextState | undefined>(
  INITIAL_ASSIGNMENTFILTEROFCLASS_STATE
);
const AssignmentFilterContext = React.createContext<
  UseReducer<AssignmentFilterContextState, AssignmentFilterContextActions>
>({} as any);
const AssignmentFilterDispatchContext = React.createContext<React.Dispatch<AssignmentFilterContextActions>>({} as any);

const reducer: Reducer<AssignmentFilterContextState, AssignmentFilterContextActions> = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ASSIGNMENT_TYPE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: {
            ...state.filters[state.currentlyViewingClass],
            selectedAssignments: state.filters[state.currentlyViewingClass].selectedAssignments.filter(
              (assignment) => assignment !== action.assignmentType
            ),
          },
        },
      };
    case 'APPEND_ASSIGNMENT_TYPE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: {
            ...state.filters[state.currentlyViewingClass],
            selectedAssignments: [
              ...state.filters[state.currentlyViewingClass].selectedAssignments,
              action.assignmentType,
            ],
          },
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: INITIAL_ASSIGNMENTFILTEROFCLASS_STATE,
        },
      };
    case 'IS_VIEWING_CLASS':
      return {
        ...state,
        currentlyViewingClass: action.className,
      };
    case 'INITIALIZE_CLASS_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.className]: INITIAL_ASSIGNMENTFILTEROFCLASS_STATE,
        },
      };
    case 'ADD_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: {
            ...state.filters[state.currentlyViewingClass],
            [action.key]: action.value,
          },
        },
      };
    default:
      return state;
  }
};

const INITIAL_STATE: AssignmentFilterContextState = {
  currentlyViewingClass: '',
  filters: {},
};

export const useAssignmentFilter = () => React.useContext(AssignmentFilterContext);
export const useAssignmentFilterDispatch = () => React.useContext(AssignmentFilterDispatchContext);
export const useAssignmentFilterOfClass = () => React.useContext(AssignmentFilterOfClassContext);

const AssignmentFilterProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const [gradebook] = useGradebook();

  React.useEffect(() => {
    gradebook?.classes.forEach((studentClass) => {
      dispatch({ type: 'INITIALIZE_CLASS_FILTER', className: studentClass.name });
    });
  }, [gradebook]);

  return (
    <AssignmentFilterContext.Provider value={[state, dispatch]}>
      <AssignmentFilterOfClassContext.Provider value={state.filters[state.currentlyViewingClass]}>
        <AssignmentFilterDispatchContext.Provider value={dispatch}>{children}</AssignmentFilterDispatchContext.Provider>
      </AssignmentFilterOfClassContext.Provider>
    </AssignmentFilterContext.Provider>
  );
};

export default AssignmentFilterProvider;
