import { CalendarEvent } from '@utilities/StudentVue/types';

export type EventProps =
  | {
      item: CalendarEvent;
    }
  | {
      isSkeleton: boolean;
    };
