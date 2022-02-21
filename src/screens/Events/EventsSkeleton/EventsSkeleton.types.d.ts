import { MonthProps } from '@screens/Events/Month/Month.types';
import React from 'react';

export interface EventsSkeletonProps {
  HeaderComponent: React.ReactElement<MonthProps>;
  isDoneLoading: boolean;
  children?: any;
}
