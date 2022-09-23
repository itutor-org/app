import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp, RecoverPassword } from '../screens/Auth/index';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="RecoverPassword" component={RecoverPassword} />
    </Navigator>
  );
}
