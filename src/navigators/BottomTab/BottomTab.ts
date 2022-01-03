import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { BottomTabParamList, MainBottomTabScreenProps } from './BottomTab.types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const useBottomTabNavigation = () => useNavigation<MainBottomTabScreenProps>();

export default BottomTab;
