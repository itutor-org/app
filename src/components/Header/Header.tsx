import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Title , HeaderContainer} from '../../screens/App/Home/styles';

type HeaderProps = {
  iconAction: () => void;
  title: string;
};

export function Header({ iconAction, title }: HeaderProps) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <MaterialIcons
        name="add-circle-outline"
        size={30}
        color={theme.colors.white}
        onPress={iconAction}
        style={{ marginBottom: 7, marginLeft: 7 }}
      />
    </HeaderContainer>
  );
}
