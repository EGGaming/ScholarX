import { RootStackNavigationProps } from '@navigators/Root/Root.types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type BottomTabParamList = {
  Dashboard: undefined;
  GradeBook: undefined;
  Profile: undefined;
  Calendar: undefined;
};

export type MainBottomTabScreenProps = BottomTabNavigationProp<BottomTabParamList>;
