import firestore from '@react-native-firebase/firestore';

const discussionsCollection = firestore().collection('discussions');

export interface Discussion {
  group_id: string;
  general_subject: string;
  specific_subject: string;
  participants_number: number;
  duration: number;
  id?: string;
  graph?: string;
  randomness_index?: number;
  classification?: string;
  interactionsId?: string;
}

export const getDiscussions = async (
  group_id: string
): Promise<Discussion[]> => {
  return await discussionsCollection
    .where('group_id', '==', group_id)
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
            participants_number: document.data().participants_number,
            duration: document.data().duration
          } as Discussion)
      ) as Discussion[];
    })
    .catch((error) => {
      throw error.code;
    });
};

export const deleteDiscussion = async (discussion_id: string) => {
  await discussionsCollection
    .doc(discussion_id)
    .delete()
    .then(() => {
      console.log('Discussion deleted');
    })
    .catch((error) => {
      throw error.code;
    });
};

export const createDiscussion = async (
  group_id: string,
  general_subject: string,
  specific_subject: string,
  participants_number: number,
  duration: number
): Promise<Discussion> => {
  return await discussionsCollection
    .add({
      group_id,
      general_subject,
      specific_subject,
      participants_number,
      duration
    })
    .then(
      async (data) =>
        await discussionsCollection
          .where(firestore.FieldPath.documentId(), '==', data.id)
          .limit(1)
          .get()
          .then(
            (querySnapshot) =>
              ({
                id: querySnapshot.docs[0].id,
                group_id: querySnapshot.docs[0].data().group_id,
                general_subject: querySnapshot.docs[0].data().general_subject,
                specific_subject: querySnapshot.docs[0].data().specific_subject,
                participants_number:
                  querySnapshot.docs[0].data().participants_number,
                duration: querySnapshot.docs[0].data().duration
              } as Discussion)
          )
    )
    .catch((error) => {
      throw error.code;
    });
};
