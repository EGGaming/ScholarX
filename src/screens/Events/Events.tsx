import Divider from '@components/Divider/Divider';
import Typography from '@components/Typography/Typography';
import { useCalendar } from '@context/CalendarContext/CalendarContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RenderEventItem } from '@screens/Events/Events.util';
import { CalendarEvent } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import { isBefore, isToday } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { FlatList } from 'react-native';

const keyExtractor: KeyExtractor<CalendarEvent> = (item) => `${item.Date}: ${item.Title}`;

const EventsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Events'>> = () => {
  const [calendar] = useCalendar();
  const upcomingEvents = React.useMemo(
    () =>
      calendar
        ? calendar.events.filter((event) => {
            return isBefore(Date.now(), Date.parse(event.Date)) || isToday(Date.parse(event.Date));
          })
        : [],
    [calendar?.events]
  );

  return (
    <FlatList
      data={_.uniqBy(upcomingEvents, 'Date')}
      renderItem={RenderEventItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default EventsScreen;
