import Skeleton from '@components/Skeleton/Skeleton';
import Typography from '@components/Typography/Typography';
import { MonthSubHeaderProps } from '@screens/Events/Month/MonthSubHeader/MonthSubHeader.types';
import React from 'react';

const MonthSubHeader: React.FC<MonthSubHeaderProps> = (props) => {
  const { numOfEventsOfSelectedMonth, loading } = props;
  if (loading) return <Skeleton.Typography variant='body2' width={155} align='center' />;
  return (
    <Typography variant='body2' align='center' color='textSecondary'>
      {numOfEventsOfSelectedMonth} events this month
    </Typography>
  );
};

export default React.memo(MonthSubHeader);
