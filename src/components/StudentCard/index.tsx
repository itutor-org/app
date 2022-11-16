import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../styles/theme';
import { Card, StudentName, ActionsButtonsWrapper } from './styles';

interface StudentCardProps {
  id: string;
  name: string;
  handleDeleteStudent: (registration: string) => void;
}

export function StudentCard({
  id,
  name,
  handleDeleteStudent
}: StudentCardProps) {
  return (
    <Card>
      <StudentName>{name}</StudentName>
      <ActionsButtonsWrapper>
        <MaterialIcons
          name="delete"
          size={25}
          color={theme.colors.gray_200}
          style={{
            marginLeft: 15
          }}
          onPress={() => handleDeleteStudent(id)}
        />
      </ActionsButtonsWrapper>
    </Card>
  );
}
