export interface Discussion {
  id: string;
  group_id: string;
  general_subject: string;
  specific_subject: string;
  participants_number: number;
  duration: number;
  graph: string;
  randomness_index: number;
  classification: string;
}

export type DiscussionDTO = Omit<Discussion, 'id'>;

export interface DiscussionResult {
  graph_image: string;
  id: string;
  randomness: string;
}
