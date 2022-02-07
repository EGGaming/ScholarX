import { UseState } from '@context/helpers';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { Month } from '@utilities/HumanTime';
import { Calendar, CalendarEvent } from '@utilities/StudentVue/types';
import useStateInitializer from '@utilities/useStateInitializer';
import { addMonths, getDaysInMonth, getMonth, isBefore, isToday } from 'date-fns';
import React from 'react';

const CalendarContext = React.createContext<UseState<Calendar | undefined>>({} as any);
const FutureCalendarContext = React.createContext<CalendarEvent[] | undefined>([] as any);
const AssignmentsInMonth = React.createContext<Map<Month, CalendarEvent[]>>(new Map());

export const useCalendar = () => React.useContext(CalendarContext);
export const useFutureEvents = () => React.useContext(FutureCalendarContext);
export const useMonthAssignments = () => React.useContext(AssignmentsInMonth);

const CalendarProvider: React.FC = ({ children }) => {
  const [calendar, setCalendar] = React.useState<Calendar>();
  const [futures, setFutures] = React.useState<CalendarEvent[]>();
  const [monthAssignments, setMonthAssignments] = React.useState<Map<Month, CalendarEvent[]>>(new Map());

  // useStateInitializer(() => client.calendar(Date.now()), setCalendar);
  // useStateInitializer(() => client.calendar(addMonths(Date.now(), 1)), setCalendar);
  React.useEffect(() => {
    if (calendar) {
      setFutures(
        calendar.events.filter((event) => {
          return isBefore(Date.now(), Date.parse(event.Date)) || isToday(Date.parse(event.Date));
        })
      );

      let events: Map<Month, CalendarEvent[]> = new Map();

      calendar.events.forEach((event) => {
        const parsed = Date.parse(event.Date);
        const month: Month = getMonth(parsed);
        const valuesExistingInMonth = events.get(month);
        if (valuesExistingInMonth) events.set(month, [...valuesExistingInMonth, event]);
        else events.set(month, [event]);
      });

      setMonthAssignments(events);
    }
  }, [calendar]);

  return (
    <CalendarContext.Provider value={[calendar, setCalendar]}>
      <AssignmentsInMonth.Provider value={monthAssignments}>
        <FutureCalendarContext.Provider value={futures}>{children}</FutureCalendarContext.Provider>
      </AssignmentsInMonth.Provider>
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
