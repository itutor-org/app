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
    groupId: string;
    name: string;
    participantsNumber: number;
    className: string;
  };
  DiscussionsList: {
    groupId: string;
    participantsNumber: number;
  };
  Discussion: {
    discussion_id: string;
    general_subject: string;
    specific_subject: string;
    participants_number: number;
    duration: number;
  };
  Results: {
    discussion_id: string;
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
