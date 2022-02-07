import { CalendarEvent } from '@utilities/StudentVue/types';
import React from 'react';

export interface DayProps {
  date: Date;
  index: number;
  selectedIndex: number;
  onIndexChange: React.Dispatch<React.SetStateAction<number>>;
  events: CalendarEvent[];
}
