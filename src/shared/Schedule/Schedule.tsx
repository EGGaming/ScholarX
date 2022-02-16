import Badge from '@components/Badge/Badge';
import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import ScheduleItemSkeleton from './ScheduleItemSkeleton';

const Schedule: React.FC = () => {
  const [schedule] = useClassSchedule();

  return (
    <Flex direction='column'>
      <Container header>
        <Typography bold variant='h3'>
          Today's Schedule
        </Typography>
      </Container>
      <ScrollView>
        <Space spacing={1} container direction='vertical'>
          {schedule
            ? schedule.classes.map((classSchedule) => (
                <ScheduleItem key={classSchedule.sectiongu} classSchedule={classSchedule} />
              ))
            : new Array(6).fill('').map((_, i) => <ScheduleItemSkeleton key={i} />)}
        </Space>
      </ScrollView>
    </Flex>
  );
};

export default React.memo(Schedule);
