import { CalendarEvent } from '@utilities/StudentVue/types';

export interface EventDetailsProps {
  eventsOnSelectedDate: CalendarEvent[];
  loading: boolean;
}
