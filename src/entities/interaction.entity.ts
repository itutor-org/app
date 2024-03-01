
import { Student } from './student.entity';

export interface Interaction {
  id?: string;
  discussion_id: string;
  type: string;
  finisher: Student;
  starter: Student;
}

export interface Action {
  name: string;
  iconName: string;
  color: string;
  isSelected: boolean;
}
