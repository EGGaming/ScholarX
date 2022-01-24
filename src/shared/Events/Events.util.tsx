import { CalendarEvent } from '@utilities/StudentVue/types';
import React from 'react';
import { ListRenderItem } from 'react-native';
import Event from './Event/Event';

export const RenderEventItem: ListRenderItem<CalendarEvent> = ({ item }) => {
  return <Event item={item} />;
};
