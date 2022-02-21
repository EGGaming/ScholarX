import {
  ClassViewerContextActions,
  ClassViewerContextState,
} from '@context/ClassViewerContext/ClassViewerContext.types';
import { Reducer, UseReducer } from '@context/helpers';
import React from 'react';

const ClassViewerContext = React.createContext<UseReducer<ClassViewerContextState, ClassViewerContextActions>>(
  {} as any
);
const ClassViewerDispatchContext = React.createContext<React.Dispatch<ClassViewerContextActions>>({} as any);

const reducer: Reducer<ClassViewerContextState, ClassViewerContextActions> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WEIGHTED_CATEGORIES':
      return {
        ...state,
        showWeightedCategories: !state.showWeightedCategories,
      };
  }
};

export const useClassViewer = () => React.useContext(ClassViewerContext);
export const useClassViewerDispatch = () => React.useContext(ClassViewerDispatchContext);

const INITIAL_STATE: ClassViewerContextState = {
  showWeightedCategories: true,
};

const ClassViewerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <ClassViewerContext.Provider value={[state, dispatch]}>
      <ClassViewerDispatchContext.Provider value={dispatch}>{children}</ClassViewerDispatchContext.Provider>
    </ClassViewerContext.Provider>
  );
};

export default ClassViewerProvider;
