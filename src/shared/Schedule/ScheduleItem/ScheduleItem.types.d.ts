import { ClassScheduleInfo, Course } from 'studentvue';

export interface ScheduleItemProps {
  classSchedule: ClassScheduleInfo;
  class: Course;
  onlyShowOngoing?: boolean;
}

export interface ScheduleItemCardProps {
  isOccuring: boolean;
}
