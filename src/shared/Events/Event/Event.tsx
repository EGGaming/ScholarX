import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { EventContainer, EventHeaderContainer } from './Event.base';
import { EventProps } from './Events.types';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { TypographyColors } from '@theme/core.types';
import Space from '@components/Space/Space';

const Event: React.FC<EventProps> = ({ item }) => {
  const parsedDate = Date.parse(item.Date);
  const title = format(parsedDate, 'EEEE, MMM do, yyyy');
  const titleColor: TypographyColors = isToday(parsedDate)
    ? 'error'
    : isTomorrow(parsedDate)
    ? 'warning'
    : isThisWeek(parsedDate)
    ? 'textPrimary'
    : 'disabled';
  const teacherName = item.Title.match(/\w+, \w/)?.toString();
  const className = teacherName ? (item.Title.match(/.*(?=( : ))/) ?? [''])[0].substring(teacherName.length + 2) : '';
  const assignmentName =
    className && teacherName
      ? item.Title?.substring(
          className.length + teacherName.length + 5,
          (item.Title.match(/.*(?=(  -))/) ?? [''])[0].length
        )
      : '';

  return (
    <EventContainer>
      <Space spacing={2} direction='vertical'>
        <Space spacing={0.5} direction='vertical'>
          <Typography variant='h3'>{item.DayType}</Typography>
          <Typography color={titleColor} variant='body'>
            {title}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {item.StartTime}
          </Typography>
        </Space>
        <Typography numberOfLines={1}>{teacherName}</Typography>
        <Typography>{className}</Typography>
        <Typography>{assignmentName}</Typography>
      </Space>
    </EventContainer>
  );
};

export default React.memo(Event);
