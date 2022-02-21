import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import IconButton from '@components/IconButton/IconButton';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import DaySkeleton from '@screens/Events/Day/DaySkeleton/DaySkeleton';
import EventItemLoading from '@screens/Events/EventItemLoading/EventItemLoading';
import Icon from '@components/Icon/Icon';
import { EventListContainer, BlankSpacer } from '@screens/Events/Events.base';
import { EventsSkeletonProps } from '@screens/Events/EventsSkeleton/EventsSkeleton.types';
import React from 'react';
import { format } from 'date-fns';

const EventsSkeleton: React.FC<EventsSkeletonProps> = ({ HeaderComponent, children, isDoneLoading }) => {
  const loadingItems = React.useMemo(
    () => new Array(Math.floor(Math.random() * 4 + 1)).fill('').map((_, i) => <EventItemLoading key={i} />),
    []
  );
  return (
    <Flex direction='column'>
      {HeaderComponent}
      {!isDoneLoading ? (
        <>
          <EventListContainer fadingEdgeLength={100}>
            <BlankSpacer />
            <BlankSpacer />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <DaySkeleton />
            <BlankSpacer />
            <BlankSpacer />
          </EventListContainer>
          <Space container spacing={1} direction='vertical'>
            {loadingItems}
          </Space>
        </>
      ) : (
        children
      )}
    </Flex>
  );
};

export default React.memo(EventsSkeleton);
