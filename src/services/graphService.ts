import { DiscussionResult } from '../entities/discussion.entity';
import { Interaction } from '../entities/interaction.entity';
import { api } from './axios';

export const createDiscussionResult = async (
  interactions: Interaction[]
): Promise<DiscussionResult> => {
  return await api
    .post('/graph', {
      interactions
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDiscussionGraph = async (id: string) => {
  return await api
    .get(`/graph/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.code;
    });
};

export const DeleteDiscussionResult = async (id: string) => {
  return await api.delete(`/graph/${id}`).catch((error) => {
    throw error.code;
  });
};
