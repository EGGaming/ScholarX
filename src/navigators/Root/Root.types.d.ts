import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { ModifiedCalendarEvent } from '@shared/Events/Event/Events.types';
import { CalendarEvent, Message } from '@utilities/StudentVue/types';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Notifications: undefined;
  NotificationViewer: {
    message: Message;
  };
  EventViewer: {
    event: CalendarEvent;
    parsedDate: number;
    title: string;
    calendar: CalendarEvent[];
  };
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
