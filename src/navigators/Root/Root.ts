import { BottomTabParamList } from '@navigators/BottomTab/BottomTab.types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootStackNavigationProps } from './Root.types';

const RootStack = createStackNavigator<RootStackParamList>();

export const useRootNavigation = () => useNavigation<RootStackNavigationProps>();

export default RootStack;
