import React from 'react';
import { StudentInfo } from 'studentvue';
import { UseState } from '@context/helpers';

const StudentInfoContext = React.createContext<UseState<StudentInfo | undefined>>({} as any);
const StudentInfoSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<StudentInfo | undefined>>>(
  {} as any
);

export const useStudentInfo = () => React.useContext(StudentInfoContext);
export const useSetStudentInfo = () => React.useContext(StudentInfoSetStateContext);

const StudentInfoProvider: React.FC = ({ children }) => {
  const [studentInfo, setStudentInfo] = React.useState<StudentInfo>();

  return (
    <StudentInfoContext.Provider value={[studentInfo, setStudentInfo]}>
      <StudentInfoSetStateContext.Provider value={setStudentInfo}>{children}</StudentInfoSetStateContext.Provider>
    </StudentInfoContext.Provider>
  );
};

export default StudentInfoProvider;
