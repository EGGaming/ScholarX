import { UseState } from '@context/helpers';
import { Schedule } from '@utilities/StudentVue/types';
import React from 'react';

const ClassScheduleContext = React.createContext<UseState<Schedule | undefined>>({} as any);

export const useClassSchedule = () => React.useContext(ClassScheduleContext);

const ClassScheduleProvider: React.FC = ({ children }) => {
  const [schedule, setSchedule] = React.useState<Schedule>();

  return <ClassScheduleContext.Provider value={[schedule, setSchedule]}>{children}</ClassScheduleContext.Provider>;
};

export default ClassScheduleProvider;
