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
import { format, formatDuration, intervalToDuration, isWithinInterval } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import ScheduleItemSkeleton from './ScheduleItemSkeleton';

const Schedule: React.FC = () => {
  const navigation = useRootNavigation();
  const [schedule] = useClassSchedule();
  const [gradebook] = useGradebook();
  const [time, setTime] = React.useState<Date>(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function handleGoToSchedule() {
    navigation.navigate('Schedule');
  }
  const occuringClass = React.useMemo(
    () =>
      schedule?.classes.filter((classSchedule) =>
        isWithinInterval(Date.now(), {
          start: new Date(classSchedule.date.start),
          end: new Date(classSchedule.date.end),
        })
      )[0],
    [schedule]
  );

  return (
    <Flex direction='column'>
      <Flex container containerProps={{ header: true }} justifyContent='space-between' alignItems='center'>
        <Typography bold variant='h3'>
          Ongoing Class
        </Typography>
        <Button
          size='small'
          title='Schedule'
          iconPlacement='right'
          onPress={handleGoToSchedule}
          icon={<Icon bundle='Feather' name='chevron-right' />}
        />
      </Flex>
      {schedule && occuringClass && schedule.classes.indexOf(occuringClass) !== -1 && (
        <Container header>
          <Typography variant='body2' color='textSecondary'>
            {formatDuration(intervalToDuration({ start: time, end: new Date(occuringClass.date.end) }))} left
          </Typography>
        </Container>
      )}
      <Container>
        {occuringClass && gradebook ? (
          occuringClass ? (
            <ScheduleItem
              key={occuringClass.sectiongu}
              classSchedule={occuringClass}
              class={gradebook.classes[schedule!.classes.indexOf(occuringClass)]}
            />
          ) : (
            <Card>
              <Typography color='textSecondary'>Passing Period</Typography>
            </Card>
          )
        ) : (
          <ScheduleItemSkeleton />
        )}
      </Container>
    </Flex>
  );
};

export default React.memo(Schedule);
