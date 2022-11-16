export interface Discussion {
  id?: string;
  group_id: string;
  general_subject: string;
  specific_subject: string;
  participants_number: number;
  duration: number;
  graph: string;
  randomness_index: string;
  classification: string;
}

export interface DiscussionResult {
  graph: string;
  id: string;
  random_percent: string;
}
