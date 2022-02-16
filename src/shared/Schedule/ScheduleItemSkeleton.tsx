import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { ClassSchedule } from '@utilities/StudentVue/types';
import React from 'react';
import Skeleton from '@components/Skeleton/Skeleton';

const ScheduleItemSkeleton: React.FC = () => {
  return (
    <Card>
      <Space spacing={1} justifyContent='space-between'>
        <Space spacing={0.2} direction='vertical'>
          <Skeleton.Typography width={180} />

          <Space spacing={0.5} alignItems='center'>
            <Icon bundle='Feather' name='clock' color='primary' size='small' />
            <Skeleton.Typography width={130} variant='caption' />
          </Space>
        </Space>
        <Skeleton.Typography width={60} variant='caption' />
      </Space>
    </Card>
  );
};

export default ScheduleItemSkeleton;
