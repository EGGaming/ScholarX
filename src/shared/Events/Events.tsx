import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { Calendar, CalendarEvent } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';
import { FlatList } from 'react-native';
import { EventsContainer, EventsListEmpty } from './Events.base';
import { RenderEventItem } from './Events.util';
import { isBefore, isToday } from 'date-fns';

const keyExtractor: KeyExtractor<CalendarEvent> = (item, index) => `${item.Title}: ${item.Date}`;

const Events: React.FC = () => {
  const [calendar, setCalendar] = React.useState<Calendar>();
  const [client] = useStudentVue();
  const upcomingEvents = React.useMemo(
    () =>
      calendar
        ? calendar.events.filter((event) => {
            return isBefore(Date.now(), Date.parse(event.Date)) || isToday(Date.parse(event.Date));
          })
        : [],
    [calendar?.events]
  );

  async function fetchCalendarEvents() {
    console.log('Fetching calendar events');
    const data = await client.calendar(Date.now());
    setCalendar(data);
  }

  React.useEffect(() => {
    fetchCalendarEvents();
  }, []);
  return (
    <>
      <EventsContainer>
        <Typography variant='h2'>Upcoming Events</Typography>
        <Button title='View All' size='small' onPress={() => {}} />
      </EventsContainer>
      <FlatList
        // ListHeaderComponent={EventsHeader}
        data={upcomingEvents}
        renderItem={RenderEventItem}
        ListEmptyComponent={EventsListEmpty}
        horizontal
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export default React.memo(Events);
