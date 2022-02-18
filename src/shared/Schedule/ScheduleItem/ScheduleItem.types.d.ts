import { ClassSchedule, StudentClass } from '@utilities/StudentVue/types';

interface ScheduleItemProps {
  classSchedule: ClassSchedule;
  class: StudentClass;
  onlyShowOngoing?: boolean;
}
