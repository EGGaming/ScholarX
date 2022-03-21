import { UseState } from '@context/helpers';
import { Gradebook } from 'studentvue';
import React from 'react';

const GradebookContext = React.createContext<UseState<Gradebook | undefined>>({} as any);

export const useGradebook = () => React.useContext(GradebookContext);

const GradebookProvider: React.FC = ({ children }) => {
  const [gradebook, setGradebook] = React.useState<Gradebook>();

  return <GradebookContext.Provider value={[gradebook, setGradebook]}>{children}</GradebookContext.Provider>;
};

export default GradebookProvider;
