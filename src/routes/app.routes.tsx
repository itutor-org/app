import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Home,
  AddGroup,
  EditGroup,
  DiscussionsList,
  Discussion,
  Results
} from '../screens/App/index';

export type AppStackParamList = {
  Home: undefined;
  AddGroup: undefined;
  EditGroup: {
    group_id: string;
    name: string;
    participants_number: number;
    class_name: string;
  };
  DiscussionsList: {
    group_id: string;
    participants_number?: number;
  };
  Discussion: {
    group_id: string;
    discussion_id: string;
    general_subject: string;
    specific_subject: string;
    participants_number: number;
    duration: number;
  };
  Results: {
    discussion_id: string;
    group_id: string;
    participants_number: number;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="AddGroup" component={AddGroup} />
      <Screen name="EditGroup" component={EditGroup} />
      <Screen name="DiscussionsList" component={DiscussionsList} />
      <Screen name="Discussion" component={Discussion} />
      <Screen name="Results" component={Results} />
    </Navigator>
  );
}
