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
import { isBefore, isToday, addMonths, sub } from 'date-fns';
import Event from './Event/Event';
import _ from 'lodash';
import { useRootNavigation } from '@navigators/Root/Root';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';
import Space from '@components/Space/Space';
import Flex from '@components/Flex/Flex';
import Skeleton from '@components/Skeleton/Skeleton';
import Scrollable from '@components/Scrollable/Scrollable';

const Events: React.FC = () => {
  const navigation = useRootNavigation();
  const [calendar, setCalendar] = useCalendar();
  const [client] = useStudentVue();
  const upcoming = useFutureEvents();
  const upcomingNonDuplicateEvents = React.useMemo(() => _.uniqBy(upcoming, 'Date'), [upcoming]);

  async function fetchCalendarEvents() {
    try {
      const [
        data1prev,
        data2prev,
        data3prev,
        data4prev,
        data5prev,
        data6prev,
        dataNow,
        data1next,
        data2next,
        data3next,
        data4next,
        data5next,
        data6next,
      ] = await Promise.all([
        client.calendar(sub(Date.now(), { months: 6 })),
        client.calendar(sub(Date.now(), { months: 5 })),
        client.calendar(sub(Date.now(), { months: 4 })),
        client.calendar(sub(Date.now(), { months: 3 })),
        client.calendar(sub(Date.now(), { months: 2 })),
        client.calendar(sub(Date.now(), { months: 1 })),
        client.calendar(Date.now()),
        client.calendar(addMonths(Date.now(), 1)),
        client.calendar(addMonths(Date.now(), 2)),
        client.calendar(addMonths(Date.now(), 3)),
        client.calendar(addMonths(Date.now(), 4)),
        client.calendar(addMonths(Date.now(), 5)),
        client.calendar(addMonths(Date.now(), 6)),
      ]);
      setCalendar({
        meta: {
          ...dataNow.meta,
          MonthBegDate: data6prev.meta.MonthBegDate,
          MonthEndDate: data6next.meta.MonthEndDate,
        },
        events: _.uniqBy(
          [
            ...data6prev.events,
            ...data5prev.events,
            ...data4prev.events,
            ...data3prev.events,
            ...data2prev.events,
            ...data1prev.events,
            ...dataNow.events,
            ...data1next.events,
            ...data2next.events,
            ...data3next.events,
            ...data4next.events,
            ...data5next.events,
            ...data6next.events,
          ],
          'Title'
        ),
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
    <Flex direction='column'>
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

      {!calendar || !upcoming ? (
        <Scrollable horizontal showsHorizontalScrollIndicator={false}>
          <Space container spacing={1}>
            {new Array(3).fill('').map((_, i) => (
              <Event key={i} isSkeleton />
            ))}
          </Space>
        </Scrollable>
      ) : calendar.events.length > 0 ? (
        <Scrollable horizontal showsHorizontalScrollIndicator={false}>
          <Space container spacing={1}>
            {upcomingNonDuplicateEvents.slice(0, 3).map((item) => (
              <Event item={item} key={`${item.Title}: ${item.Date}`} />
            ))}
          </Space>
        </Scrollable>
      ) : (
        <Card>
          <Typography bold>You're caught up!</Typography>
          <Typography color='textSecondary' variant='body2'>
            There are no upcoming events.
          </Typography>
        </Card>
      )}
    </Flex>
  );
};

export default React.memo(Events);
