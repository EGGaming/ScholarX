import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { Calendar, CalendarEvent } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { EventsContainer, EventsListEmpty } from './Events.base';
import { isBefore, isToday, addMonths } from 'date-fns';
import Event from './Event/Event';
import _ from 'lodash';
import { useRootNavigation } from '@navigators/Root/Root';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';
import Space from '@components/Space/Space';
import Flex from '@components/Flex/Flex';
import Skeleton from '@components/Skeleton/Skeleton';

const Events: React.FC = () => {
  const navigation = useRootNavigation();
  const [calendar, setCalendar] = useCalendar();
  const [client] = useStudentVue();
  const upcoming = useFutureEvents();
  const upcomingNonDuplicateEvents = React.useMemo(() => _.uniqBy(upcoming, 'Date'), [upcoming]);

  async function fetchCalendarEvents() {
    try {
      const [data1, data2] = await Promise.all([
        client.calendar(Date.now()),
        client.calendar(addMonths(Date.now(), 1)),
      ]);
      setCalendar({
        meta: {
          ...data1.meta,
          MonthBegDate: data1.meta.MonthBegDate,
          MonthEndDate: data2.meta.MonthEndDate,
        },
        events: _.uniqBy([...data1.events, ...data2.events], 'Title'),
      });
    } catch (e) {
      console.error(e);
    }
  }

  function onViewAll() {
    navigation.navigate('Events');
  }

  React.useEffect(() => {
    fetchCalendarEvents();
  }, []);

  return (
    <Space spacing={1} direction='vertical'>
      <EventsContainer>
        <Typography variant='h3' bold>
          Upcoming events
        </Typography>
        <Button
          title='See all'
          size='small'
          onPress={onViewAll}
          icon={<Icon bundle='Feather' name='chevron-right' />}
          iconPlacement='right'
        />
      </EventsContainer>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {new Array(3).fill('').map((_, i) => (
          <Event key={i} isSkeleton />
        ))}
        {upcomingNonDuplicateEvents.slice(0, 3).map((item) => (
          <Event item={item} key={`${item.Title}: ${item.Date}`} />
        ))}
      </ScrollView> */}
      {calendar == null || upcoming == null ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {new Array(3).fill('').map((_, i) => (
            <Event key={i} isSkeleton />
          ))}
        </ScrollView>
      ) : calendar.events.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingNonDuplicateEvents.slice(0, 3).map((item) => (
            <Event item={item} key={`${item.Title}: ${item.Date}`} />
          ))}
        </ScrollView>
      ) : (
        <Card>
          <Typography bold>You're caught up!</Typography>
          <Typography color='textSecondary' variant='body2'>
            There are no upcoming events.
          </Typography>
        </Card>
      )}
    </Space>
  );
};

export default React.memo(Events);
