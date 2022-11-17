import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useLoading } from '../../contexts/loading';
import { useAuth } from '../../contexts/useAuth';
import { AppStackParamList } from '../../routes/app.routes';
import { theme } from '../../styles/theme';
import { Container, TeacherInfo, TeacherName, TeacherEmail } from './styles';

interface TopBarProps {
  navigation: NativeStackNavigationProp<AppStackParamList, any>;
  isHome?: boolean;
}

export function TopBar({ navigation, isHome }: TopBarProps) {
  const { user, logoff } = useAuth();
  const { setLoading } = useLoading();

  return (
    <Container>
      {!isHome && (
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={theme.colors.dark_yellow}
          onPress={() => navigation.popToTop()}
        />
      )}
      <TeacherInfo>
        <TeacherName>Prof. {user.name}</TeacherName>
        <TeacherEmail>{user.email}</TeacherEmail>
      </TeacherInfo>
      <MaterialIcons
        name="logout"
        size={30}
        color={theme.colors.white}
        onPress={() => {
          setLoading(true);
          logoff();
        }}
      />
    </Container>
  );
}

export default Container;
