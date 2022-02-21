export interface DaysProps {
  daysInMonth: {
    date: Date;
    isSelected: boolean;
    events: CalendarEvent[];
    id: number;
  }[];
  onIndexChange: (n: number) => void;
  loading: boolean;
}
