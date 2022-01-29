import Loader from '@components/Loader/Loader';
import Space from '@components/Space/Space';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';
import {
  FindMySchoolDistrictContainer,
  FindMySchoolDistrictKeyboardAvoidingContainer,
  LocationImage,
} from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict.shared';
import { FindMySchoolDistrictProps } from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict.types';
import React from 'react';

const FindMySchoolDistrict: React.FC<FindMySchoolDistrictProps> = ({ navigation }) => {
  const [state] = useAppReducer();

  const [zipCode, setZipCode] = React.useState<string>('');

  async function onZipCodeSubmit() {
    if (zipCode.length === 0 || !zipCode.match(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/g)) return;
    navigation.navigate('DistrictList', { zipCode });
  }

  return (
    <FindMySchoolDistrictKeyboardAvoidingContainer>
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
