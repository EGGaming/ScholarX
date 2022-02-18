import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { Reducer, UseReducer } from '@context/helpers';
import _ from 'lodash';
import React from 'react';
import {
  AssignmentFilterContextActions,
  AssignmentFilterContextFields,
  AssignmentFilterContextState,
  AssignmentFilterOfClassContextState,
  Order,
} from './AssignmentFilterContext.types';

const INITIAL_ASSIGNMENTFILTEROFCLASS_STATE: AssignmentFilterOfClassContextState = {
  withDropbox: false,
  orderType: Order.ASCENDING,
  selectedAssignments: [],
};

export const AssignmentFilterField: AssignmentFilterContextFields = {
  withDropbox: React.createContext<boolean>(false),
  orderType: React.createContext<Order>(Order.ASCENDING),
  selectedAssignments: React.createContext<string[]>([]),
};

export const AssignmentCategoriesContext = React.createContext<string[]>([]);

const AssignmentFilterOfClassContext = React.createContext<AssignmentFilterOfClassContextState | undefined>(
  INITIAL_ASSIGNMENTFILTEROFCLASS_STATE
);
const AssignmentFilterContext = React.createContext<
  UseReducer<AssignmentFilterContextState, AssignmentFilterContextActions>
>({} as any);
const AssignmentFilterDispatchContext = React.createContext<React.Dispatch<AssignmentFilterContextActions>>({} as any);

const reducer: Reducer<AssignmentFilterContextState, AssignmentFilterContextActions> = (state, action) => {
  switch (action.type) {
    case 'DESELECT_ALL_ASSIGNMENT_TYPES':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: {
            ...state.filters[state.currentlyViewingClass],
            selectedAssignments: [],
          },
        },
      };
    case 'APPEND_OR_REMOVE_ASSIGNMENT_TYPE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.currentlyViewingClass]: {
            ...state.filters[state.currentlyViewingClass],
            selectedAssignments: state.filters[state.currentlyViewingClass].selectedAssignments.some(
              (assignment) => assignment === action.assignmentType
            )
              ? state.filters[state.currentlyViewingClass].selectedAssignments.filter(
                  (assignment) => assignment !== action.assignmentType
                )
              : [...state.filters[state.currentlyViewingClass].selectedAssignments, action.assignmentType],
          },
        },
      };
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
        currentlyViewingClass: action.class.name,
        assignmentCategories: _.uniq(action.class.assignments.map((assignment) => assignment.type)) ?? [],
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
  assignmentCategories: [],
  filters: {},
};

export const useAssignmentFilter = () => React.useContext(AssignmentFilterContext);
export const useAssignmentFilterDispatch = () => React.useContext(AssignmentFilterDispatchContext);
export const useAssignmentFilterOfClass = () => React.useContext(AssignmentFilterOfClassContext);
export const useAssignmentCategories = () => React.useContext(AssignmentCategoriesContext);

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
        <AssignmentFilterDispatchContext.Provider value={dispatch}>
          <AssignmentFilterField.withDropbox.Provider value={state.filters[state.currentlyViewingClass].withDropbox}>
            <AssignmentFilterField.orderType.Provider value={state.filters[state.currentlyViewingClass].orderType}>
              <AssignmentFilterField.selectedAssignments.Provider
                value={state.filters[state.currentlyViewingClass].selectedAssignments}>
                <AssignmentCategoriesContext.Provider value={state.assignmentCategories}>
                  {children}
                </AssignmentCategoriesContext.Provider>
              </AssignmentFilterField.selectedAssignments.Provider>
            </AssignmentFilterField.orderType.Provider>
          </AssignmentFilterField.withDropbox.Provider>
        </AssignmentFilterDispatchContext.Provider>
      </AssignmentFilterOfClassContext.Provider>
    </AssignmentFilterContext.Provider>
  );
};

export default AssignmentFilterProvider;
