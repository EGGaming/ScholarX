import { RootStackNavigationProps } from '@navigators/Root/Root.types';
import { CompositeNavigationProp, CompositeScreenProps, NativeStackNavigationProp } from '@react-navigation/native';
import { DistrictInfo } from '@utilities/StudentVue/types';

export type LoginStackParamList = {
  Welcome: undefined;
  FindMySchoolDistrict: undefined;
  DistrictList: {
    zipCode: string;
  };
  SignIn: undefined;
};

export type LoginStackScreenProps = CompositeNavigationProp<
  RootStackNavigationProps,
  NativeStackNavigationProp<LoginStackParamList>
>;
