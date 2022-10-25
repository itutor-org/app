import firestore from '@react-native-firebase/firestore';
import { Student } from './studentService';

const interactionsCollection = firestore().collection('interactions');

interface Interaction {
  discussion_id: string;
  starter: Student;
  type: string;
  finisher: Student;
}

export const createInteraction = async (
  discussion_id: string,
  starter: Student,
  type: string,
  finisher: Student
): Promise<void> => {
  return await interactionsCollection
    .add({
      discussion_id,
      starter,
      type,
      finisher
    })
    .then(() => {
      return;
    });
};

export const getInteractionByDiscussion = async (
  id: string
): Promise<Interaction[]> => {
  return await interactionsCollection
    .where('discussion_id', '==', id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((document) => ({
        id: document.id,
        discussion_id: document.data().discussion_id,
        starter: document.data().starter,
        type: document.data().type,
        finisher: document.data().finisher
      }));
    })
    .catch((error) => {
      throw error.code;
    });
};
