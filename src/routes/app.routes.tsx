import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, AddGroup, EditGroup } from '../screens/App/index';

export type AppStackParamList = {
  Home: undefined;
  AddGroup: undefined;
  EditGroup: {
    groupId: string;
    name: string;
    participantsNumber: number;
    className: string;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="AddGroup" component={AddGroup} />
      <Screen name="EditGroup" component={EditGroup} />
    </Navigator>
  );
}
