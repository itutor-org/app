import { Student } from './student.entity';

export interface Interaction {
  discussion_id: string;
  starter: Student;
  type: string;
  finisher: Student;
}

export interface Action {
  name: string;
  tag: string;
  color: string;
  isSelected: boolean;
}
