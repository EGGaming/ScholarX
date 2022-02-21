import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { format } from 'date-fns';
import { MonthProps } from '@screens/Events/Month/Month.types';

const Month: React.FC<MonthProps> = ({ onNextMonth, onPreviousMonth, selectedMonth }) => {
  return (
    <Space spacing={1} justifyContent='center'>
      <IconButton icon={<Icon bundle='Feather' name='chevron-left' />} onPress={onPreviousMonth} />
      <Typography variant='h2' bold align='center'>
        {format(selectedMonth, 'MMMM')}
      </Typography>
      <IconButton icon={<Icon bundle='Feather' name='chevron-right' />} onPress={onNextMonth} />
    </Space>
  );
};

export default Month;
