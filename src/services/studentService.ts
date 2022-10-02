import firestore from '@react-native-firebase/firestore';
import { Student } from '../screens/App/AddGroup';

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
      const student: Student = {
        name: querySnapshot.docs[0].data().name,
        email: querySnapshot.docs[0].data().email,
        id: querySnapshot.docs[0].data().id,
        registration: querySnapshot.docs[0].data().registration
      };

      return student;
    });

  return data;
};

export const getStudentByGroup = async (id: string): Promise<Student[]> => {
  const data = await studentsCollection
    .where('group_id', '==', id)
    .get()
    .then((querySnapshot) => {
      const students = querySnapshot.docs.map((documentSnapshot) =>
        students.push(documentSnapshot.data())
      );

      return students;
    });

  return data;
};
