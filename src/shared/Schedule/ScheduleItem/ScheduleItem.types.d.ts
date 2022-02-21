import { ClassSchedule, StudentClass } from '@utilities/StudentVue/types';

export interface ScheduleItemProps {
  classSchedule: ClassSchedule;
  class: StudentClass;
  onlyShowOngoing?: boolean;
}

export interface ScheduleItemCardProps {
  isOccuring: boolean;
}
