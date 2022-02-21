import Space from '@components/Space/Space';
import { EventDetailsProps } from '@screens/Events/Day/EventDetails/EventDetails.types';
import EventEmpty from '@screens/Events/EventEmpty/EventEmpty';
import EventItem from '@screens/Events/EventItem/EventItem';
import EventItemLoading from '@screens/Events/EventItemLoading/EventItemLoading';
import React from 'react';

const EventDetails: React.FC<EventDetailsProps> = (props) => {
  const { eventsOnSelectedDate, loading } = props;
  const loadingItems = React.useMemo(
    () => new Array(Math.floor(Math.random() * 4 + 1)).fill('').map((_, i) => <EventItemLoading key={i} />),
    []
  );
  if (loading)
    return (
      <Space container spacing={1} direction='vertical'>
        {loadingItems}
      </Space>
    );
  return eventsOnSelectedDate.length > 0 ? (
    <Space container spacing={1} direction='vertical'>
      {eventsOnSelectedDate.map((event) => (
        <EventItem event={event} key={event.Title} />
      ))}
    </Space>
  ) : (
    <EventEmpty />
  );
};

export default EventDetails;
