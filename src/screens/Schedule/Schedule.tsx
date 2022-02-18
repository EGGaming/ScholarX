import Button from '@components/Button/Button';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import ScheduleItem from '@shared/Schedule/ScheduleItem/ScheduleItem';
import ScheduleItemSkeleton from '@shared/Schedule/ScheduleItemSkeleton';
import React from 'react';

const Schedule: React.FC = () => {
  const [schedule] = useClassSchedule();
  const [gradebook] = useGradebook();

  return (
    <Space spacing={1} container direction='vertical'>
      {schedule && gradebook
        ? schedule.classes.map((classSchedule, i) => (
            <ScheduleItem key={classSchedule.sectiongu} classSchedule={classSchedule} class={gradebook.classes[i]} />
          ))
        : new Array(6).fill('').map((_, i) => <ScheduleItemSkeleton key={i} />)}
    </Space>
  );
};

export default React.memo(Schedule);
