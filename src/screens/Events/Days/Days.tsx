import Day from '@screens/Events/Day/Day';
import DaySkeleton from '@screens/Events/Day/DaySkeleton/DaySkeleton';
import { DaysProps } from '@screens/Events/Days/Days.types';
import { BlankSpacer, EventListContainer } from '@screens/Events/Events.base';
import React from 'react';
import { ScrollView } from 'react-native';

const Days = React.forwardRef<ScrollView, DaysProps>((props, ref) => {
  const { loading, daysInMonth, onIndexChange } = props;
  const days = React.useMemo(
    () =>
      !loading ? (
        daysInMonth.map(({ date, isSelected, events, id }) => (
          <Day key={id} date={date} isSelected={isSelected} onIndexChange={onIndexChange} index={id} events={events} />
        ))
      ) : (
        <>
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
        </>
      ),
    [onIndexChange, daysInMonth, loading]
  );

  return (
    <EventListContainer ref={ref} fadingEdgeLength={100}>
      <BlankSpacer />
      <BlankSpacer />
      {days}
      <BlankSpacer />
      <BlankSpacer />
    </EventListContainer>
  );
});

export default React.memo(Days);
