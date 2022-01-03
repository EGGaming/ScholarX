import { RootStackNavigationProps } from '@navigators/Root/Root.types';
import { CompositeNavigationProp, CompositeScreenProps, NativeStackNavigationProp } from '@react-navigation/native';

export type LoginStackParamList = {
  Welcome: undefined;
  FindMySchoolDistrict: undefined;
  SignIn: undefined;
};

export type LoginStackScreenProps = CompositeNavigationProp<
  RootStackNavigationProps,
  NativeStackNavigationProp<LoginStackParamList>
>;
