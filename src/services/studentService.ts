import firestore from '@react-native-firebase/firestore';
import { Student } from '../screens/App/AddGroup';
import { deleteGroup } from './groupService';

const studentsCollection = firestore().collection('students');

export interface User {
  name: string;
  email: string;
  id: string;
  registration: string;
}

export const createStudent = async (
  name,
  email,
  registration,
  group_id
): Promise<Student> => {
  const res = await studentsCollection.add({
    name,
    email,
    registration,
    group_id
  });

  const student = await getStudent(res.id);

  return student;
};

export const getStudent = async (id: string): Promise<Student> => {
  const data = await studentsCollection
    .where(firestore.FieldPath.documentId(), '==', id)
    .get()
    .then((querySnapshot) => {
      return {
        name: querySnapshot.docs[0].data().name,
        email: querySnapshot.docs[0].data().email,
        id: querySnapshot.docs[0].data().id,
        registration: querySnapshot.docs[0].data().registration
      } as Student;
    });

  return data;
};

export const getStudentsByGroup = async (id: string): Promise<Student[]> => {
  const data = await studentsCollection
    .where('group_id', '==', id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((document) => ({
        id: document.id,
        name: document.data().name,
        email: document.data().email,
        registration: document.data().registration
      })) as Student[];
    })
    .catch((error) => {
      throw console.log(error.code);
    });

  return data;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await studentsCollection.doc(id).delete();
};
