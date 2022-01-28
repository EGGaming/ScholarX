import Space from '@components/Space/Space';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import {
  FindMySchoolDistrictContainer,
  FindMySchoolDistrictKeyboardAvoidingContainer,
  LocationImage,
} from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict.shared';
import { FindMySchoolDistrictProps } from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict.types';
import SchoolDistricts from '@shared/SchoolDistricts/SchoolDistricts';
import StudentVue from '@utilities/StudentVue';
import { DistrictInfo } from '@utilities/StudentVue/types';
import React from 'react';
import { View } from 'react-native';

const FindMySchoolDistrict: React.FC<FindMySchoolDistrictProps> = ({ navigation }) => {
  const [state] = useAppReducer();

  React.useEffect(() => {
    if (state.districtUrl.length !== 0) {
      navigation.navigate('SignIn');
    }
  }, [state.districtUrl]);
  const [zipCode, setZipCode] = React.useState<string>('');
  const [districts, setDistricts] = React.useState<DistrictInfo[]>([]);

  async function onZipCodeSubmit() {
    if (zipCode.length === 0 || !zipCode.match(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/g)) return;

    navigation.navigate('DistrictList', { districts });
  }

  return (
    <FindMySchoolDistrictKeyboardAvoidingContainer>
      {/* <SchoolDistricts districts={districts} /> */}
      <LocationImage />
      <FindMySchoolDistrictContainer>
        <Space spacing={1} direction='vertical'>
          <React.Fragment>
            <Typography variant='h2' bold>
              Let's find your school district
            </Typography>
            <Typography color='textSecondary'>
              Type in your school's zip code and select your school district above
            </Typography>
          </React.Fragment>
          <TextField
            width='60%'
            keyboardType='number-pad'
            returnKeyType='done'
            placeholder='Zip Code'
            onChangeText={setZipCode}
            onSubmitEditing={onZipCodeSubmit}
          />
        </Space>
      </FindMySchoolDistrictContainer>
    </FindMySchoolDistrictKeyboardAvoidingContainer>
  );
};

export default FindMySchoolDistrict;
