import Card from '@components/Card/Card';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import React from 'react';

const EventItemLoading: React.FC = () => (
  <Card>
    <Space spacing={1} direction='vertical'>
      <>
        <Skeleton.Typography variant='caption' width={Math.random() * 100 + 200} />
        <Skeleton.Typography variant='body' width={Math.random() * 100 + 200} />
      </>
      <Skeleton.Typography variant='body2' width={100} />
    </Space>
  </Card>
);

export default React.memo(EventItemLoading);
