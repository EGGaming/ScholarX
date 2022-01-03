import { UseState } from '@context/helpers';
import { Client } from '@utilities/StudentVue';
import React from 'react';

const StudentVueClientContext = React.createContext<UseState<Client>>({} as any);

export const useStudentVue = () => React.useContext(StudentVueClientContext);

const StudentVueClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = React.useState<Client>({} as any);

  return <StudentVueClientContext.Provider value={[client, setClient]}>{children}</StudentVueClientContext.Provider>;
};

export default StudentVueClientProvider;
