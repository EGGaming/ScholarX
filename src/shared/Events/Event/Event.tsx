import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { EventActionsContainer, EventContainer, EventHeaderContainer } from './Event.base';
import { EventProps } from './Events.types';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { AppColors, TypographyColors } from '@theme/core.types';
import Space from '@components/Space/Space';
import Chip from '@components/Chip/Chip';
import { View } from 'react-native';
import { useAppTheme } from '@theme/core';

const Event: React.FC<EventProps> = ({ item }) => {
  const parsedDate = Date.parse(item.Date);
  const title = format(parsedDate, 'EEEE, MMM do, yyyy');
  const titleColor: TypographyColors = isToday(parsedDate)
    ? 'error'
    : isTomorrow(parsedDate)
    ? 'warning'
    : 'textPrimary';
  const teacherName = item.Title.match(/\w+, \w/)?.toString();
  const className = teacherName ? (item.Title.match(/.*(?=( : ))/) ?? [''])[0].substring(teacherName.length + 2) : '';
  const assignmentName =
    className && teacherName
      ? item.Title?.substring(
          className.length + teacherName.length + 5,
          (item.Title.match(/.*(?=(  -))/) ?? [''])[0].length
        )
      : '';
  const chipColor: AppColors = (() => {
    switch (item.DayType) {
      case 'Holiday':
        return 'success';
      default:
        return 'primary';
    }
  })();

  return (
    <EventContainer>
      <Space spacing={1.5} direction='vertical'>
        <Space spacing={0.5} direction='vertical'>
          <Space direction='horizontal' spacing={0.5} alignItems='center'>
            <Chip title={item.DayType} color={chipColor} />
            <Typography variant='caption' color='textSecondary'>
              {item.StartTime}
            </Typography>
          </Space>
          <Typography color={titleColor} variant='body2'>
            {title}
          </Typography>
        </Space>
      </Space>
      {item.DayType == 'Assignment' ? (
        <EventActionsContainer>
          <Button
            title='See Details'
            icon={<Icon bundle='Feather' name='chevron-right' />}
            iconPlacement='right'
            onPress={() => console.log('Viewing Assignments')}
          />
        </EventActionsContainer>
      ) : (
        <Typography bold>{item.Title}</Typography>
      )}
    </EventContainer>
  );
};

export default React.memo(Event);
