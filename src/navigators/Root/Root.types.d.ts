import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { ModifiedCalendarEvent } from '@shared/Events/Event/Events.types';
import {
  CalendarEvent,
  ClassSchedule,
  Message,
  StudentClass,
  StudentClassAssignment,
} from '@utilities/StudentVue/types';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Notifications: undefined;
  NotificationViewer: {
    message: Message;
    parsedDate: number;
  };
  EventViewer: {
    event: CalendarEvent;
    title: string;
  };
  Events: undefined;
  ClassViewer: {
    class: StudentClass;
  };
  AssignmentViewer: {
    assignment: StudentClassAssignment;
  };
  AssignmentFilters: undefined;
  Schedule: undefined;
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
