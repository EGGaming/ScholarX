import { useAppReducer } from '@context/AppContext/AppContext';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import LoginStack from '@navigators/Login/Login';
import { CardStyleInterpolators } from '@react-navigation/stack';
import FindMySchoolDistrict from '@screens/Login/FindMySchoolDistrict/FindMySchoolDistrict';
import { LoginScreenProps } from '@screens/Login/index.types';
import SignIn from '@screens/Login/SignIn/SignIn';
import Welcome from '@screens/Login/Welcome/Welcome';
import React from 'react';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [session, dispatch] = useSessionReducer();
  const [app, dispatchApp] = useAppReducer();
  const initialRoute = React.useMemo(() => {
    if (app.districtUrl && app.districtName) return 'SignIn';
    return 'Welcome';
  }, [app.districtName, app.districtUrl]);
  React.useEffect(() => {
    if (session.validSession) navigation.navigate('Main');
  }, [session.validSession]);

  return (
    <LoginStack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name='Welcome' component={Welcome} />
      <LoginStack.Screen name='FindMySchoolDistrict' component={FindMySchoolDistrict} />
      <LoginStack.Screen name='SignIn' component={SignIn} />
    </LoginStack.Navigator>
  );
};

export default LoginScreen;
