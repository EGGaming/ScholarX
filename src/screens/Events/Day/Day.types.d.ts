import { CalendarEvent } from '@utilities/StudentVue/types';
import React from 'react';

export interface DayProps {
  date: Date;
  isSelected: boolean;
  index: number;
  onIndexChange: (i: number) => void;
  events: CalendarEvent[];
}
