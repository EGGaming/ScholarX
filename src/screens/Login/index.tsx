import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import LoginStack from '@navigators/Login/Login';
import { CardStyleInterpolators } from '@react-navigation/stack';
import FindMySchoolDistrict from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict';
import { LoginScreenProps } from '@screens/Login/index.types';
import SignIn from '@screens/Login/SignIn/SignIn';
import Welcome from '@screens/Login/Welcome/Welcome';
import Header from '@shared/@react-navigation/Header';
import React from 'react';
import Search from './components/Search/Search';
import DistrictList from './DistrictList/DistrictList';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [session, dispatch] = useSessionReducer();
  const [app, dispatchApp] = useAppReducer();
  const [focused, setFocused] = React.useState<boolean>(false);
  const initialRoute = React.useMemo(() => {
    if (app.districtUrl && app.districtName) return 'SignIn';
    return 'Welcome';
  }, [app.districtName, app.districtUrl]);
  React.useEffect(() => {
    if (session.validSession) navigation.navigate('Main');
  }, [session.validSession]);

  function onPress() {
    setFocused(true);
  }

  return (
    <LoginStack.Navigator initialRouteName={initialRoute} screenOptions={{ header: (props) => <Header {...props} /> }}>
      <LoginStack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
      <LoginStack.Screen
        name='FindMySchoolDistrict'
        component={FindMySchoolDistrict}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
      <LoginStack.Screen
        name='DistrictList'
        component={DistrictList}
        options={{
          headerTitle: () => <Search focused={focused} setFocused={setFocused} />,
          headerRight: () => (
            <>{!focused && <IconButton icon={<Icon bundle='Feather' name='search' />} onPress={onPress} />}</>
          ),
        }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginScreen;
