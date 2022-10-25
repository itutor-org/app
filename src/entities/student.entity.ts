export interface Student {
  id: string;
  name: string;
  registration: string;
  email: string;
  group_id: string;
}

export type StudentDTO = Omit<Student, 'id'>;

export interface ScreenStudent extends Student {
  isSelected: boolean;
}
