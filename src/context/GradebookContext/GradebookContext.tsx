import { UseState } from '@context/helpers';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { Gradebook } from '@utilities/StudentVue/types';
import useStateInitializer from '@utilities/useStateInitializer';
import React from 'react';

const GradebookContext = React.createContext<UseState<Gradebook | undefined>>({} as any);

export const useGradebook = () => React.useContext(GradebookContext);

const GradebookProvider: React.FC = ({ children }) => {
  const [gradebook, setGradebook] = React.useState<Gradebook>();

  return <GradebookContext.Provider value={[gradebook, setGradebook]}>{children}</GradebookContext.Provider>;
};

export default GradebookProvider;
