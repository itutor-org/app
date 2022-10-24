import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export interface User {
  name: string;
  email: string;
  id: string;
  registration: string;
}

export const createUser = async ({ name, email, id, registration }: User) => {
  await usersCollection.add({
    name,
    email,
    id,
    registration
  });
};

export const getUser = async (id: string): Promise<User> => {
  return await usersCollection
    .where('id', '==', id)
    .limit(1)
    .get()
    .then(
      (querySnapshot) =>
        ({
          name: querySnapshot.docs[0].data().name,
          email: querySnapshot.docs[0].data().email,
          id: querySnapshot.docs[0].data().id,
          registration: querySnapshot.docs[0].data().registration
        } as User)
    );
};

export const addGroupToUser = async (id: string, group_id: string) => {
  await usersCollection
    .doc(id)
    .update({
      group_id
    })
    .catch((error) => {
      throw error.code;
    });
};
