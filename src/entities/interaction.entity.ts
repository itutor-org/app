import { Student } from './student.entity';

export interface Interaction {
  discussion_id: string;
  type: string;
  finisher: Student;
  starter: Student;
}

export interface InteractionResponse extends Interaction {
  id: string;
}

export interface Action {
  name: string;
  tag: string;
  color: string;
  isSelected: boolean;
}
