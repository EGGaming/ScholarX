import Badge from '@components/Badge/Badge';
import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { useRootNavigation } from '@navigators/Root/Root';
import { ClassSchedule, StudentClass } from '@utilities/StudentVue/types';
import { format, formatDuration, intervalToDuration, isPast, isWeekend, isWithinInterval } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import ScheduleItemSkeleton from './ScheduleItemSkeleton';

const Schedule: React.FC = () => {
  const navigation = useRootNavigation();
  const [schedule] = useClassSchedule();
  const [gradebook] = useGradebook();
  const [time, setTime] = React.useState<Date>(new Date());
  const [nextClass, setNextClass] = React.useState<ClassSchedule>();
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function handleGoToSchedule() {
    navigation.navigate('Schedule');
  }
  const occuringClass = React.useMemo(() => {
    if (schedule == null) return null;

    const current = schedule.classes!.filter((classSchedule) =>
      isWithinInterval(Date.now(), {
        start: new Date(classSchedule.date.start),
        end: new Date(classSchedule.date.end),
      })
    )[0];
    setNextClass(schedule.classes![schedule.classes!.indexOf(current) + 1]);
    return current;
  }, [schedule, setNextClass]);

  const isFinishedWithSchool = React.useMemo(() => {
    if (isWeekend(Date.now())) return true;
    if (schedule == null) return false;
    for (const classSchedule of schedule.classes!) {
      if (isPast(new Date(classSchedule.date.end))) return true;
    }
    return false;
  }, [schedule]);

  return (
    <Flex direction='column'>
      <Flex container containerProps={{ header: true }} justifyContent='space-between' alignItems='center'>
        <Typography bold variant='h3'>
          {!occuringClass ? 'Upcoming class' : 'Ongoing class'}
        </Typography>
        <Button
          size='small'
          title='Schedule'
          iconPlacement='right'
          onPress={handleGoToSchedule}
          icon={<Icon bundle='Feather' name='chevron-right' />}
        />
      </Flex>
      {schedule && occuringClass && schedule.classes && schedule.classes.indexOf(occuringClass) !== -1 && (
        <Container header>
          <Typography variant='body2' color='textSecondary'>
            {formatDuration(intervalToDuration({ start: time, end: new Date(occuringClass.date.end) }))} left
          </Typography>
        </Container>
      )}
      {gradebook ? (
        occuringClass && schedule && schedule.classes ? (
          <Container>
            <ScheduleItem
              key={occuringClass.sectiongu}
              classSchedule={occuringClass}
              class={gradebook.classes[schedule.classes.indexOf(occuringClass)]}
            />
          </Container>
        ) : isFinishedWithSchool ? (
          <Container header>
            <Typography variant='body2' color='textSecondary'>
              There are no more classes for today
            </Typography>
          </Container>
        ) : nextClass && schedule && schedule.classes ? (
          <Container>
            <ScheduleItem
              key={nextClass.sectiongu}
              classSchedule={nextClass}
              class={gradebook.classes[schedule.classes.indexOf(nextClass)]}
            />
          </Container>
        ) : null
      ) : (
        <Container>
          <ScheduleItemSkeleton />
        </Container>
      )}
    </Flex>
  );

  return (
    <Flex container direction='column' grow containerProps={{ header: true }}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Typography variant='h3' bold>
          No classes today
        </Typography>
        <Button
          size='small'
          title='Schedule'
          iconPlacement='right'
          onPress={() => {}}
          icon={<Icon bundle='Feather' name='chevron-right' />}
        />
      </Flex>
      <Typography color='textSecondary'>There are no classes today</Typography>
    </Flex>
  );
};

export default React.memo(Schedule);
