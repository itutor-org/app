import firestore from '@react-native-firebase/firestore';

const discussionsCollection = firestore().collection('discussions');

export interface Discussion {
  id: string;
  group_id: string;
  general_subject: string;
  specific_subject: string;
  interactions_id: string;
  graph: string;
  randomness_index: number;
  classification: string;
  participants_number: number;
}

export const getDiscussions = async (
  groupId: string
): Promise<Discussion[]> => {
  const data = await discussionsCollection
    .where('group_id', '==', groupId)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map(
        (document) =>
          ({
            id: document.id,
            group_id: document.data().group_id,
            general_subject: document.data().general_subject,
            specific_subject: document.data().specific_subject,
            interactions_id: document.data().interactions_id,
            graph: document.data().graph,
            randomness_index: document.data().randomness_index,
            classification: document.data().classification,
            participants_number: document.data().participants_number
          } as Discussion)
      ) as Discussion[];
    })
    .catch((error) => {
      throw console.log(error.code);
    });

  return data;
};

export const deleteDiscussion = async (discussionId: string) => {
  await discussionsCollection
    .doc(discussionId)
    .delete()
    .then(() => {
      console.log('Discussion deleted');
    })
    .catch((error) => {
      console.log(error.code);
    });
};
