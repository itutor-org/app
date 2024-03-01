import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useLoading } from '../../contexts/loading';
import { useAuth } from '../../contexts/useAuth';
import { AppStackParamList } from '../../routes/app.routes';
import { theme } from '../../styles/theme';
import { Container, TeacherInfo, TeacherName, TeacherEmail, TeacherImage, ContainerChildren } from './styles';

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
          color={theme.colors.light_orange}
          onPress={() => navigation.popToTop()}
        />
      )}
        {isHome && (
        <ContainerChildren>
        
          <TeacherImage
            source={require('../../assets/images/prof.png')}
          />
          
        <TeacherInfo>
          <TeacherName>Prof. {user.name}</TeacherName>
          <TeacherEmail>{user.email}</TeacherEmail>
        </TeacherInfo>
        </ContainerChildren>
        )}
      <MaterialIcons
        name="logout"
        size={30}
        color={theme.colors.white}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            logoff();
          }, 2000);
        }}
      />
    </Container>
  );
}

export default Container;
