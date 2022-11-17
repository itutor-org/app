import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiscussionResult } from '../entities/discussion.entity';

import {
  Home,
  AddGroup,
  EditGroup,
  DiscussionsList,
  Discussion,
  Results
} from '../screens/App/index';
import { theme } from '../styles/theme';

export type AppStackParamList = {
  Home: undefined;
  AddGroup: undefined;
  EditGroup: {
    group_id: string;
    name: string;
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
    discussion_result: DiscussionResult;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
        animationTypeForReplace: 'push',
        orientation: 'portrait_up'
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="AddGroup" component={AddGroup} />
      <Screen name="EditGroup" component={EditGroup} />
      <Screen name="DiscussionsList" component={DiscussionsList} />
      <Screen name="Discussion" component={Discussion} />
      <Screen name="Results" component={Results} />
    </Navigator>
  );
}
