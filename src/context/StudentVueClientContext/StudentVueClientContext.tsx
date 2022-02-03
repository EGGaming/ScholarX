import { UseState } from '@context/helpers';
import Storage from '@utilities/Storage';
import { Client } from '@utilities/StudentVue';
import React from 'react';

const StudentVueClientContext = React.createContext<UseState<Client>>(null as any);

export const useStudentVue = () => React.useContext(StudentVueClientContext);

const StudentVueClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = React.useState<Client>({} as any);

  return <StudentVueClientContext.Provider value={[client, setClient]}>{children}</StudentVueClientContext.Provider>;
};

export default StudentVueClientProvider;
