import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { Message } from '@utilities/StudentVue/types';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Notifications: undefined;
  NotificationViewer: {
    message: Message;
  };
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
