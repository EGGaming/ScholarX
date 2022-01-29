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
import { isBefore, isToday, addMonths } from 'date-fns';
import Event from './Event/Event';
import _ from 'lodash';
import { useRootNavigation } from '@navigators/Root/Root';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';

const Events: React.FC = () => {
  const navigation = useRootNavigation();
  const [calendar, setCalendar] = useCalendar();
  const [client] = useStudentVue();
  const upcomingEvents = useFutureEvents();

  async function fetchCalendarEvents() {
    const [data1, data2] = await Promise.all([client.calendar(Date.now()), client.calendar(addMonths(Date.now(), 1))]);
    setCalendar({
      meta: {
        ...data1.meta,
        MonthBegDate: data1.meta.MonthBegDate,
        MonthEndDate: data2.meta.MonthEndDate,
      },
      events: _.uniqBy([...data1.events, ...data2.events], 'Title'),
    });
  }

  function onViewAll() {
    navigation.navigate('Events');
  }

  React.useEffect(() => {
    fetchCalendarEvents();
  }, []);

  return (
    <>
      <EventsContainer>
        <Typography variant='h2'>Upcoming Events</Typography>
        <Button title='View All' size='small' onPress={onViewAll} />
      </EventsContainer>
      {calendar &&
        _.uniqBy(upcomingEvents, 'Date')
          .slice(0, 3)
          .map((item) => <Event item={item} key={`${item.Title}: ${item.Date}`} />)}
    </>
  );
};

export default React.memo(Events);
