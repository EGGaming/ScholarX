import { UseState } from '@context/helpers';
import { Schedule } from 'studentvue';
import useStateInitializer from '@utilities/useStateInitializer';
import React from 'react';

const ClassScheduleContext = React.createContext<UseState<Schedule | undefined>>(undefined as any);

export const useClassSchedule = () => React.useContext(ClassScheduleContext);

const ClassScheduleProvider: React.FC = ({ children }) => {
  const [schedule, setSchedule] = React.useState<Schedule>();

  return <ClassScheduleContext.Provider value={[schedule, setSchedule]}>{children}</ClassScheduleContext.Provider>;
};

export default ClassScheduleProvider;
