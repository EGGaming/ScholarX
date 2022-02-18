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
import { format } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import ScheduleItemSkeleton from './ScheduleItemSkeleton';

const Schedule: React.FC = () => {
  const navigation = useRootNavigation();
  const [schedule] = useClassSchedule();
  const [gradebook] = useGradebook();
  function handleGoToSchedule() {
    navigation.navigate('Schedule');
  }

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
      <Container>
        {schedule && gradebook ? (
          schedule.classes.map((classSchedule, i) => (
            <ScheduleItem
              key={classSchedule.sectiongu}
              classSchedule={classSchedule}
              class={gradebook.classes[i]}
              onlyShowOngoing
            />
          ))
        ) : (
          <ScheduleItemSkeleton />
        )}
      </Container>
    </Flex>
  );
};

export default React.memo(Schedule);
