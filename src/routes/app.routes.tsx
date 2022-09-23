import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/App/index';

export type AppStackParamList = {
  Home: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
