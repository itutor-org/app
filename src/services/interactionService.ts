import firestore from '@react-native-firebase/firestore';
import { Interaction } from '../entities/interaction.entity';
import { Student } from '../entities/student.entity';

const interactionsCollection = firestore().collection('interactions');

export const createInteraction = async (
  discussion_id: string,
  starter: Student,
  type: string,
  finisher: Student
): Promise<void> => {
  return await interactionsCollection
    .add({
      discussion_id,
      type,
      finisher,
      starter
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
    .then((querySnapshot) =>
      querySnapshot.docs.map((document) => ({
        discussion_id: document.data().discussion_id,
        id: document.id,
        type: document.data().type,
        finisher: document.data().finisher,
        starter: document.data().starter
      }))
    )
    .catch((error) => {
      throw error.code;
    });
};

export const deleteInteraction = async (interaction_id: string) => {
  await interactionsCollection
    .doc(interaction_id)
    .delete()
    .catch((error) => {
      console.log(error.code);
    });
};

export const deleteInteractionsByDiscussion = async (
  interaction_id: string
) => {
  const interactions = await getInteractionByDiscussion(interaction_id);

  interactions.forEach(async (interaction) => {
    await deleteInteraction(interaction.id).catch((error) => {
      console.log(error.code);
    });
  });
};
