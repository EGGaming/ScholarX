import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useCalendar, useMonthAssignments } from '@context/CalendarContext/CalendarContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { sub, format, getDate, add, isThisMonth, isSameDay, isSameMonth, isSameYear, isFuture, isPast } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { Dimensions, InteractionManager, ScrollView } from 'react-native';
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
import Scrollable from '@components/Scrollable/Scrollable';
import { useCollapsibleHeader, UseCollapsibleOptions } from 'react-navigation-collapsible';
import Header from '@shared/@react-navigation/Header';
import { Animated } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { CalendarEvent } from '@utilities/StudentVue/types';
import DaySkeleton from '@screens/Events/Day/DaySkeleton/DaySkeleton';
import EventsSkeleton from '@screens/Events/EventsSkeleton/EventsSkeleton';
import MonthHeader from '@screens/Events/Month/Month';
import MonthSubHeader from '@screens/Events/Month/MonthSubHeader/MonthSubHeader';
import EventDetails from '@screens/Events/Day/EventDetails/EventDetails';
import Days from '@screens/Events/Days/Days';

const EventsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Events'>> = () => {
  const [calendar] = useCalendar();
  const options: UseCollapsibleOptions = {
    navigationOptions: {
      header: (props: JSX.IntrinsicAttributes & StackHeaderProps) => <Header {...props} />,
      headerTitle: '',
      headerRight: () => (
        <Space spacing={1}>
          <IconButton icon={<Icon bundle='MaterialCommunityIcons' name='calendar-clock' />} onPress={() => {}} />
          <IconButton icon={<Icon bundle='Feather' name='filter' />} onPress={() => {}} />
        </Space>
      ),
    },
    config: {
      useNativeDriver: true,
    },
  };
  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleHeader(options);
  const monthAssignment = useMonthAssignments();
  const [isDoneLoading, setIsDoneLoading] = React.useState<boolean>(false);

  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());
  const [numOfEventsForSelectedMonth, setNumOfEventsForSelectedMonth] = React.useState<number | null>(null);
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = React.useState<CalendarEvent[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);

  const getEventsOnDate = React.useCallback(
    (selectedDate: Date) =>
      monthAssignment
        .get(selectedDate.getMonth() as Month)
        ?.filter((event) => isSameDay(Date.parse(event.Date), selectedDate)) ?? [],
    [monthAssignment]
  );

  const numOfDaysInMonth = React.useMemo(() => getDaysInMonth(selectedMonth), [selectedMonth]);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (isThisMonth(selectedMonth)) setSelectedIndex(getDate(Date.now()) - 1);
    else if (isPast(selectedMonth)) setSelectedIndex(numOfDaysInMonth - 1);
    else setSelectedIndex(0);
  }, [selectedMonth]);

  const daysInMonth = React.useMemo(
    () =>
      new Array(numOfDaysInMonth).fill('').map((_, i) => {
        const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i + 1);
        return { date, isSelected: selectedIndex === i, events: getEventsOnDate(date), id: i };
      }),
    [numOfDaysInMonth, selectedMonth, selectedIndex, getEventsOnDate]
  );

  const currentSelectedDate = React.useMemo(
    () => new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), selectedIndex + 1),
    [selectedMonth, selectedIndex]
  );

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsDoneLoading(true);
    });
  }, [isDoneLoading]);
  const reset = React.useCallback(() => {
    setIsDoneLoading(false);
    setEventsOnSelectedDate([]);
    setNumOfEventsForSelectedMonth(null);
  }, [setNumOfEventsForSelectedMonth, setEventsOnSelectedDate, setIsDoneLoading]);

  React.useEffect(() => {
    setNumOfEventsForSelectedMonth(monthAssignment.get(selectedMonth.getMonth() as Month)?.length ?? 0);
  }, [monthAssignment, selectedMonth]);

  React.useEffect(() => {
    setEventsOnSelectedDate(getEventsOnDate(currentSelectedDate));
  }, [currentSelectedDate]);

  React.useEffect(() => {
    if (isDoneLoading)
      scrollRef.current?.scrollTo({ x: 90 * selectedIndex - Dimensions.get('window').width / 2.55 + 160, y: 0 });
  }, [selectedIndex, isDoneLoading]);

  const handleOnPreviousMonth = React.useCallback(() => {
    reset();
    setSelectedMonth((current) => sub(current, { months: 1 }));
  }, [reset, setSelectedMonth]);

  const handleOnNextMonth = React.useCallback(() => {
    reset();
    setSelectedMonth((current) => add(current, { months: 1 }));
  }, [setSelectedMonth, reset]);

  const handleOnIndexChange = React.useCallback((i: number) => {
    setSelectedIndex(i);
  }, []);

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: containerPaddingTop }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}>
      <Container>
        <MonthHeader
          onNextMonth={handleOnNextMonth}
          onPreviousMonth={handleOnPreviousMonth}
          selectedMonth={selectedMonth}
        />
        <MonthSubHeader
          numOfEventsOfSelectedMonth={numOfEventsForSelectedMonth}
          loading={!isDoneLoading || !calendar || !numOfEventsForSelectedMonth}
        />
      </Container>

      <Days ref={scrollRef} daysInMonth={daysInMonth} onIndexChange={handleOnIndexChange} loading={!isDoneLoading} />

      <EventDetails eventsOnSelectedDate={eventsOnSelectedDate} loading={!isDoneLoading} />
    </Animated.ScrollView>
  );
};

export default EventsScreen;
