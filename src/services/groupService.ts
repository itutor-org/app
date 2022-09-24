import firestore from '@react-native-firebase/firestore';

const groupsCollection = firestore().collection('groups');

export interface Group {
  id: string;
  user_id: string;
  name: string;
  participants_number: number;
  class_name: string;
  students_id: string;
  discussions_id: string;
}

export const getGroups = async (id: string): Promise<Group[]> => {
  const data = await groupsCollection
    .where('user_id', '==', id)
    .get()
    .then((querySnapshot) => {
      const groups = querySnapshot.docs.map((document) => {
        const group: Group = {
          id: document.id,
          user_id: document.data().user_id,
          name: document.data().name,
          participants_number: document.data().participants_number,
          class_name: document.data().class_name,
          students_id: document.data().students_id,
          discussions_id: document.data().discussions_id
        };

        return group;
      });

      return groups;
    });

  return data;
};
