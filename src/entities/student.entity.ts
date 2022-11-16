export interface Student {
  id?: string;
  name: string;
  registration: string;
  email: string;
  group_id?: string;
}

export interface ScreenStudent extends Student {
  isSelected: boolean;
}
