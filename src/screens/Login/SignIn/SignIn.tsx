import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Loading from '@components/Loading/Loading';
import Space from '@components/Space/Space';
import Switch from '@components/Switch/Switch';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { useFocusEffect } from '@react-navigation/native';
import {
  BackButtonContainer,
  SignInContainer,
  SignInWrapper,
  StateContainer,
} from '@screens/Login/SignIn/SignIn.shared';
import { SignInProps } from '@screens/Login/SignIn/SignIn.types';
import StudentVue from '@utilities/StudentVue';
import React from 'react';

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [state, dispatch] = useAppReducer();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [session, dispatchSession] = useSessionReducer();
  const [error, setError] = React.useState<string>('');
  const [client, setClient] = useStudentVue();
  function onTextUsernameChange(e: string) {
    dispatch({ type: 'SETTER', key: 'username', payload: e });
  }
  function onTextPasswordChange(e: string) {
    dispatch({ type: 'SETTER', key: 'password', payload: e });
  }
  function onBackButtonPress() {
    dispatch({ type: 'CLEAR_DISTRICT' });
    navigation.navigate('FindMySchoolDistrict');
  }
  function toggleSignIn() {
    dispatchSession({ type: 'TOGGLE_STAYED_SIGN_IN' });
  }
  async function onSignIn() {
    try {
      setLoading(true);
      const client = await StudentVue.login(state.districtUrl, state.username, state.password);
      setClient(client);
      const studentInfo = await client.studentInfo();
      dispatchSession({ type: 'LOGIN', user: studentInfo });
    } catch (e) {
      setError(`${e}`.substring(14));
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatchSession({ type: 'LOGOUT' });
    }, [])
  );

  return (
    <SignInContainer>
      <BackButtonContainer>
        <IconButton icon={<Icon bundle='AntDesign' name='back' />} onPress={onBackButtonPress} />
      </BackButtonContainer>
      <SignInWrapper direction='vertical' spacing={1}>
        <Typography variant='h2' bold>
          {state.districtName}
        </Typography>
        <Space direction='vertical' spacing={0.5}>
          <Typography>Username</Typography>
          <TextField width='100%' value={state.username} placeholder='Username' onChangeText={onTextUsernameChange} />
        </Space>
        <Space direction='vertical' spacing={0.5}>
          <Typography>Password</Typography>
          <TextField
            width='100%'
            value={state.password}
            secureTextEntry
            placeholder='Password'
            onChangeText={onTextPasswordChange}
          />
        </Space>
        <Space spacing={1} justifyContent='flex-end' alignItems='center' direction='horizontal'>
          <Typography>Stay signed in?</Typography>
          <Switch checked={session.staySignedIn} onChange={toggleSignIn} color='secondary' />
        </Space>
        <Button
          title='Log in'
          onPress={onSignIn}
          variant='contained'
          textCentered
          disabled={loading}
          icon={loading ? <Loading /> : undefined}
        />
        {error.length !== 0 && (
          <Typography color='error'>
            <Icon bundle='Feather' name='alert-circle' color='error' />
            {'  '}
            {error}
          </Typography>
        )}
      </SignInWrapper>
    </SignInContainer>
  );
};

export default SignIn;
