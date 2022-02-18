import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Loading from '@components/Loader/Loader';
import Space from '@components/Space/Space';
import Switch from '@components/Switch/Switch';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { useFocusEffect } from '@react-navigation/native';
import { BackButtonContainer, SignInContainer, SignInWrapper } from '@screens/Login/SignIn/SignIn.shared';
import { SignInProps } from '@screens/Login/SignIn/SignIn.types';
import StudentVue from '@utilities/StudentVue';
import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import Flex from '@components/Flex/Flex';

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [state, dispatch] = useAppReducer();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [session, dispatchSession] = useSessionReducer();
  const [hidePassword, toggleHidePassword] = React.useReducer((s) => !s, true);
  const [error, setError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [usernameError, setUsernameError] = React.useState<string>('');
  const [client, setClient] = useStudentVue();
  function onTextUsernameChange(e: string) {
    dispatch({ type: 'SETTER', key: 'username', payload: e });
  }
  function onTextPasswordChange(e: string) {
    dispatch({ type: 'SETTER', key: 'password', payload: e });
  }

  React.useEffect(() => {
    if (state.staySignedIn) biometricSignIn();
    return () => {
      setPasswordError('');
      setUsernameError('');
      setError('');
      if (client == null) dispatch({ type: 'CLEAR_DISTRICT' });
    };
  }, []);

  async function biometricSignIn() {
    const canUseBiometrics =
      (await LocalAuthentication.isEnrolledAsync()) && (await LocalAuthentication.hasHardwareAsync());
    if (canUseBiometrics && state.username.length > 0 && state.password.length > 0) {
      const { success } = await LocalAuthentication.authenticateAsync({ promptMessage: 'Use biometrics to sign in' });
      if (success) onSignIn();
      else dispatch({ type: 'CLEAR_CREDENTIALS' });
    }
  }

  function onBackButtonPress() {
    navigation.navigate('FindMySchoolDistrict');
  }
  function toggleSignIn() {
    dispatch({ type: 'TOGGLE_STAY_SIGNED_IN' });
  }

  const validateForm = React.useCallback(
    (): Promise<void> =>
      new Promise((resolve, reject) => {
        setPasswordError('');
        setUsernameError('');
        if (state.password.length === 0) {
          setPasswordError('This field is required');
          reject('Password field must be set');
        }
        if (state.username.length === 0) {
          setUsernameError('This field is required');
          reject('Username field must be set');
        }

        resolve();
      }),
    [state.password, state.username, setPasswordError, setUsernameError]
  );

  async function onSignIn() {
    try {
      await validateForm();
      try {
        setLoading(true);
        const [client, studentInfo] = await StudentVue.login(state.districtUrl, state.username, state.password);
        setClient(client);
        dispatchSession({ type: 'LOGIN', user: studentInfo });
      } catch (e) {
        setError(`${e}`.substring(14));
      } finally {
        setLoading(false);
      }
    } catch (e) {}
  }

  React.useEffect(() => {
    if (!loading && !state.staySignedIn && !error) {
      dispatch({ type: 'CLEAR_CREDENTIALS' });
    }
  }, [loading]);

  useFocusEffect(
    React.useCallback(() => {
      dispatchSession({ type: 'LOGOUT' });
    }, [dispatchSession])
  );

  return (
    <SignInContainer>
      <BackButtonContainer>
        <IconButton icon={<Icon bundle='AntDesign' name='back' />} onPress={onBackButtonPress} />
      </BackButtonContainer>
      <SignInWrapper>
        <Space direction='vertical' spacing={1} justifyContent='center'>
          <Typography variant='h2' bold>
            {state.districtName}
          </Typography>
          <Space direction='vertical' spacing={0.5}>
            <Typography>Username</Typography>
            <TextField
              error={usernameError}
              width='100%'
              value={state.username}
              placeholder='Username'
              onChangeText={onTextUsernameChange}
            />
          </Space>
          <Space direction='vertical' spacing={0.5}>
            <Typography>Password</Typography>
            <TextField
              error={passwordError}
              width='100%'
              value={state.password}
              secureTextEntry={hidePassword}
              adornmentEnd={
                <IconButton
                  icon={<Icon bundle='Feather' name={hidePassword ? 'eye-off' : 'eye'} />}
                  onPress={toggleHidePassword}
                />
              }
              placeholder='Password'
              onChangeText={onTextPasswordChange}
            />
          </Space>
          <Space spacing={1} justifyContent='flex-end' alignItems='center' direction='horizontal'>
            <Typography>Stay signed in?</Typography>
            <Switch checked={state.staySignedIn} onChange={toggleSignIn} />
          </Space>
          <Button
            title={loading ? 'Logging in...' : 'Sign in'}
            onPress={onSignIn}
            textCentered
            variant='contained'
            disabled={loading}
            icon={loading && <Loading />}
          />
          {error && (
            <Flex grow justifyContent='center'>
              <Typography color='error'>{error}</Typography>
            </Flex>
          )}
        </Space>
      </SignInWrapper>
    </SignInContainer>
  );
};

export default SignIn;
