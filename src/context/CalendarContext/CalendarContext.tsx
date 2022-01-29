import { UseState } from '@context/helpers';
import { Calendar, CalendarEvent } from '@utilities/StudentVue/types';
import { isBefore, isToday } from 'date-fns';
import React from 'react';

const CalendarContext = React.createContext<UseState<Calendar | undefined>>({} as any);
const FutureCalendarContext = React.createContext<CalendarEvent[]>([] as any);

export const useCalendar = () => React.useContext(CalendarContext);
export const useFutureEvents = () => React.useContext(FutureCalendarContext);

const CalendarProvider: React.FC = ({ children }) => {
  const [calendar, setCalendar] = React.useState<Calendar>();
  const [futures, setFutures] = React.useState<CalendarEvent[]>([]);
  React.useEffect(() => {
    if (calendar) {
      setFutures(
        calendar.events.filter((event) => {
          return isBefore(Date.now(), Date.parse(event.Date)) || isToday(Date.parse(event.Date));
        })
      );
    }
  }, [calendar]);

  return (
    <CalendarContext.Provider value={[calendar, setCalendar]}>
      <FutureCalendarContext.Provider value={futures}>{children}</FutureCalendarContext.Provider>
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
