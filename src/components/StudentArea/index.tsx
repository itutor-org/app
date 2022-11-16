import React from 'react';
import { Student, StudentForValidation } from '../../entities/student.entity';
import { theme } from '../../styles/theme';
import { Button } from '../Button';
import { StudentsList } from '../StudentsList';
import { Container } from './styles';

interface StudentAreaProps {
  students: Student[] | StudentForValidation[];
  handleDeleteStudent: (registration: string) => void;
  openRegisterModal: () => void;
}

export function StudentArea({
  students,
  handleDeleteStudent,
  openRegisterModal
}: StudentAreaProps) {
  return (
    <Container>
      <Button
        text="Adicionar aluno"
        onPress={openRegisterModal}
        style={{
          marginBottom: 5,
          backgroundColor: theme.colors.medium_green
        }}
      />
      <StudentsList
        students={students}
        handleDeleteStudent={handleDeleteStudent}
      />
    </Container>
  );
}
