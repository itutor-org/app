import React from 'react';
import { Student, StudentForValidation } from '../../entities/student.entity';
import { StudentCard } from '../StudentCard';
import { List } from './styles';

interface StudentsListProps {
  students: Student[] | StudentForValidation[];
  handleDeleteStudent: (registration: string) => void;
}

export function StudentsList({
  students,
  handleDeleteStudent
}: StudentsListProps) {
  return (
    <List
      showsVerticalScrollIndicator={true}
      data={students}
      keyExtractor={({ registration }: StudentForValidation) => registration}
      renderItem={({ item }: any) => (
        <StudentCard
          key={item.id}
          id={item.id}
          name={item.name}
          handleDeleteStudent={() => handleDeleteStudent(item.registration)}
        />
      )}
    />
  );
}
