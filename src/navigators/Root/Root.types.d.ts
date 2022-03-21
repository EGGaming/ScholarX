import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { ModifiedCalendarEvent } from '@shared/Events/Event/Events.types';
import {
  Event,
  Schedule as ClassSchedule,
  Message,
  Course as StudentClass,
  Assignment as StudentClassAssignment,
  WeightedCategory,
  Assignment,
  Course,
} from 'studentvue';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Notifications: undefined;
  NotificationViewer: {
    message: Message;
    parsedDate: number;
  };
  EventViewer: {
    event: Event;
    title: string;
  };
  Events: undefined;
  ClassViewer: {
    class: Course;
  };
  AssignmentViewer: {
    assignment: Assignment;
  };
  AssignmentFilters: undefined;
  Schedule: undefined;
  FilterCategories: undefined;
  CategoryWeighingViewer: {
    summary: WeightedCategory[];
  };
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
