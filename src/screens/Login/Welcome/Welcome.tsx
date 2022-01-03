import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { EducationImage, LoginContainer } from '@screens/Login/Welcome/Welcome.shared';
import { WelcomeProps } from '@screens/Login/Welcome/Welcome.types';
import React from 'react';
import { View, Text, Image } from 'react-native';

const Login: React.FC<WelcomeProps> = ({ navigation }) => {
  const handleOnPress = React.useCallback(() => {
    navigation.navigate('FindMySchoolDistrict');
  }, [navigation]);
  return (
    <LoginContainer>
      <EducationImage />
      <Space spacing={1} direction='vertical'>
        <React.Fragment>
          <Typography variant='h2' bold>
            A dashboard for students
          </Typography>
          <Typography color='textSecondary'>View your classes and grades with ScholarX</Typography>
        </React.Fragment>

        <Button title='Get Started' onPress={handleOnPress} variant='contained' textCentered />
      </Space>
    </LoginContainer>
  );
};

export default React.memo(Login);
