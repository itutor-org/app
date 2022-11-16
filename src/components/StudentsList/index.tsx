import React from 'react';
import { Student } from '../../entities/student.entity';
import { StudentCard } from '../StudentCard';
import { List } from './styles';

interface StudentsListProps {
  students: Student[];
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
      keyExtractor={({ registration }: Student) => registration}
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
