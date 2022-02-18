import Card from '@components/Card/Card';
import Divider from '@components/Divider/Divider';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import ListItem from '@components/List/ListItem';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';
import { useRootNavigation } from '@navigators/Root/Root';
import { EventItemProps } from '@screens/Events/EventItem/EventItem.types';
import { Assignment } from '@screens/EventViewer/EventViewer.types';
import { useAppTheme } from '@theme/core';
import { TypographyColors } from '@theme/core.types';
import { format, formatDistance, isFuture, isPast, isToday, isTomorrow } from 'date-fns';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const navigation = useRootNavigation();
  const parsedDate = Date.parse(event.Date);
  const title = format(parsedDate, 'EEE, MMM do, yyyy');
  const opacity = useSharedValue(0);
  React.useEffect(() => {
    opacity.value = withSpring(1);
  }, []);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  function onPress() {
    navigation.navigate('EventViewer', { event, title });
  }

  const assignment: Assignment = React.useMemo(() => {
    const teacherName = (event.Title.match(/\w+, \w/) ?? [''])[0];
    const className = (event.Title.match(/\s\s.*(?= : )/) ?? [''])[0].substring(2);
    const period = Number((event.Title.match(/\(\d\)/) ?? [''])[0].replace(/\(|\)/g, ''));
    const assignmentName = event.Title.substring(teacherName.length + className.length + 5);
    const score = (assignmentName.match(/\s\-\sScore.*/) ?? [''])[0];
    return {
      teacher: teacherName,
      assignmentName: assignmentName.substring(0, assignmentName.length - score.length - 1),
      class: className.substring(0, className.length - 3),
      score: (() => {
        const temp = score.replace(/\s-\sScore:\s/, '');
        switch (temp) {
          case '':
          case '-':
            return '-';
          default:
            return `${temp}%`;
        }
      })(),
      period,
    };
  }, [event]);

  if (event.DayType === 'Assignment')
    return (
      <Card style={style}>
        <Space spacing={1} direction='vertical'>
          <>
            <Typography variant='caption' color='textSecondary' numberOfLines={1}>
              {assignment.class}
            </Typography>
            <Typography variant='body' bold>
              {assignment.assignmentName}
            </Typography>
          </>
          <>
            <Typography variant='body2'>
              Score:{' '}
              <Typography variant='body2' color='primary'>
                {assignment.score}
              </Typography>
            </Typography>
          </>
        </Space>
      </Card>
    );

  return (
    <Card style={style}>
      <Typography numberOfLines={1}>{event.DayType}</Typography>
      <Typography numberOfLines={1} color='textSecondary' variant='body2'>
        {event.Title}
      </Typography>
    </Card>
  );
};

export default React.memo(EventItem);
