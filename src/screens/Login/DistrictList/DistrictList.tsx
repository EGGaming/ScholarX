import Typography from '@components/Typography/Typography';
import { LoginStackParamList } from '@navigators/Login/Login.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SchoolDistricts from '@shared/SchoolDistricts/SchoolDistricts';
import React from 'react';

const DistrictList: React.FC<NativeStackScreenProps<LoginStackParamList, 'DistrictList'>> = ({
  route: {
    params: { districts, search },
  },
}) => {
  return <SchoolDistricts districts={districts} search={search} />;
};

export default DistrictList;
