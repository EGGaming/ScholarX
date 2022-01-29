import React from 'react';
import EventItem from '@screens/Events/EventItem/EventItem';
import { CalendarEvent } from '@utilities/StudentVue/types';
import { ListRenderItem } from 'react-native';

export const RenderEventItem: ListRenderItem<CalendarEvent> = ({ item }) => <EventItem event={item} />;
