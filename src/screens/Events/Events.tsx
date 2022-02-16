import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useCalendar, useMonthAssignments } from '@context/CalendarContext/CalendarContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { sub, format, getDate, add, isThisMonth, isSameDay, isSameMonth, isSameYear } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { getDaysInMonth } from 'date-fns';
import Day from '@screens/Events/Day/Day';
import Flex from '@components/Flex/Flex';
import Skeleton from '@components/Skeleton/Skeleton';
import IconButton from '@components/IconButton/IconButton';
import Icon from '@components/Icon/Icon';
import EventItem from '@screens/Events/EventItem/EventItem';
import { BlankSpacer, EventListContainer } from '@screens/Events/Events.base';
import { Month } from '@utilities/HumanTime';
import EventItemLoading from './EventItemLoading/EventItemLoading';
import EventEmpty from './EventEmpty/EventEmpty';

const EventsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Events'>> = () => {
  const [calendar] = useCalendar();
  const monthAssignment = useMonthAssignments();
  const [daysInMonth, setDaysInMonth] = React.useState<number>(getDaysInMonth(Date.now()));
  const [selectedIndex, setSelectedIndex] = React.useState<number>(getDate(Date.now()));
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());
  const scrollRef = React.useRef<ScrollView>(null);
  const currentSelectedDate = React.useMemo(
    () => new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), selectedIndex + 1),
    [selectedMonth, selectedIndex]
  );
  const numOfEventsForSelectedMonth = React.useMemo(
    () => monthAssignment.get(selectedMonth.getMonth() as Month)?.length ?? 0,
    [monthAssignment, selectedMonth]
  );

  const getEventsOnDate = React.useCallback(
    (selectedDate: Date) =>
      monthAssignment
        .get(selectedDate.getMonth() as Month)
        ?.filter((event) => isSameDay(Date.parse(event.Date), selectedDate)) ?? [],
    [monthAssignment]
  );

  const eventsOnSelectedDate = React.useMemo(
    () => getEventsOnDate(currentSelectedDate),
    [getEventsOnDate, currentSelectedDate]
  );

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ x: 90 * selectedIndex - Dimensions.get('window').width / 2.55 + 160, y: 0 });
  }, [selectedIndex]);

  React.useEffect(() => {
    setDaysInMonth(getDaysInMonth(selectedMonth));
    if (isThisMonth(selectedMonth)) setSelectedIndex(getDate(Date.now()));
    else setSelectedIndex(-1);
  }, [selectedMonth]);

  const previousMonth = React.useCallback(() => {
    setSelectedMonth((current) => sub(current, { months: 1 }));
  }, [setSelectedMonth]);

  const nextMonth = React.useCallback(() => {
    setSelectedMonth((current) => add(current, { months: 1 }));
  }, [setSelectedMonth]);

  return (
    <ScrollView>
      <Flex direction='column'>
        <Container>
          <Space spacing={1} justifyContent='center'>
            <IconButton icon={<Icon bundle='Feather' name='chevron-left' />} onPress={previousMonth} />
            <Typography variant='h2' bold align='center'>
              {format(selectedMonth, 'MMMM')}
            </Typography>
            <IconButton icon={<Icon bundle='Feather' name='chevron-right' />} onPress={nextMonth} />
          </Space>
          {calendar ? (
            <Typography variant='body2' align='center' color='textSecondary'>
              {numOfEventsForSelectedMonth} events this month
            </Typography>
          ) : (
            <Skeleton.Typography variant='body2' width={155} align='center' />
          )}
        </Container>
        <EventListContainer ref={scrollRef} fadingEdgeLength={100}>
          <BlankSpacer />
          <BlankSpacer />
          {new Array(daysInMonth).fill('').map((_, i) => {
            const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i + 1);
            return (
              <Day
                date={date}
                key={i}
                onIndexChange={setSelectedIndex}
                selectedIndex={selectedIndex}
                index={i}
                events={getEventsOnDate(date)}
              />
            );
          })}
          <BlankSpacer />
          <BlankSpacer />
        </EventListContainer>

        {calendar ? (
          eventsOnSelectedDate.length > 0 ? (
            <Space container spacing={1} direction='vertical'>
              {eventsOnSelectedDate.map((event) => (
                <EventItem event={event} key={event.Title} />
              ))}
            </Space>
          ) : (
            <EventEmpty />
          )
        ) : (
          new Array(Math.floor(Math.random() * 4 + 1)).fill('').map((_, i) => <EventItemLoading key={i} />)
        )}
      </Flex>
    </ScrollView>
  );
};

export default EventsScreen;
