import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { ClassSchedule } from '@utilities/StudentVue/types';
import React from 'react';
import { ScheduleItemProps } from './ScheduleItem.types';
import { isFuture, isWithinInterval, parse } from 'date-fns';

const ScheduleItem: React.FC<ScheduleItemProps> = ({ classSchedule }) => {
  const parsedStartDate = new Date(classSchedule.date.start);
  const parsedEndDate = new Date(classSchedule.date.end);
  const isOccuring = isWithinInterval(new Date(), {
    start: parsedStartDate,
    end: parsedEndDate,
  });
  return (
    <Card>
      <Space spacing={1} justifyContent='space-between'>
        <Flex direction='column' shrink>
          <Typography bold numberOfLines={1}>
            {classSchedule.name}
          </Typography>

          <Space spacing={0.5} alignItems='center'>
            <Icon
              bundle='MaterialCommunityIcons'
              name={isOccuring ? 'clock' : 'clock-outline'}
              color={isOccuring ? 'secondary' : isFuture(parsedStartDate) ? 'primary' : 'textSecondary'}
              size='small'
            />
            <Typography
              bold
              color={isOccuring ? 'secondary' : isFuture(parsedStartDate) ? 'primary' : 'textSecondary'}
              variant='caption'>
              {classSchedule.time.start} - {classSchedule.time.end}
            </Typography>
          </Space>
        </Flex>
        <Typography variant='caption' color='textSecondary'>
          Period {classSchedule.period}
        </Typography>
      </Space>
    </Card>
  );
};

export default ScheduleItem;
