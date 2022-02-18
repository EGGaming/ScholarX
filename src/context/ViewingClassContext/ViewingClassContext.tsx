import { UseState } from '@context/helpers';
import { StudentClass } from '@utilities/StudentVue/types';
import React from 'react';

const ViewingClassContext = React.createContext<UseState<StudentClass | undefined>>([] as any);
const ViewingClassContextDispatch = React.createContext<React.Dispatch<React.SetStateAction<StudentClass | undefined>>>(
  {} as any
);

export const useViewingClass = () => React.useContext(ViewingClassContext);
export const useViewingClassDispatch = () => React.useContext(ViewingClassContextDispatch);

const ViewingClassProvider: React.FC = ({ children }) => {
  const [studentClass, setStudentClass] = React.useState<StudentClass>();

  return (
    <ViewingClassContextDispatch.Provider value={setStudentClass}>
      <ViewingClassContext.Provider value={[studentClass, setStudentClass]}>{children}</ViewingClassContext.Provider>
    </ViewingClassContextDispatch.Provider>
  );
};

export default ViewingClassProvider;
