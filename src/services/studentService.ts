import firestore from '@react-native-firebase/firestore';
import { Student } from '../entities/student.entity';

const studentsCollection = firestore().collection('students');

export const createStudent = async (
  name: string,
  email: string,
  registration: string,
  group_id: string
): Promise<Student> => {
  try {
    const res = await studentsCollection.add({
      name,
      email,
      registration,
      group_id
    });

    const student = await getStudent(res.id);

    return student;
  } catch (error) {
    throw error;
  }
};

export const getStudent = async (id: string): Promise<Student> => {
  return await studentsCollection
    .where(firestore.FieldPath.documentId(), '==', id)
    .get()
    .then((querySnapshot) => {
      return {
        name: querySnapshot.docs[0].data().name,
        email: querySnapshot.docs[0].data().email,
        id: querySnapshot.docs[0].data().id,
        registration: querySnapshot.docs[0].data().registration,
        group_id: querySnapshot.docs[0].data().group_id
      } as Student;
    })
    .catch((error) => {
      throw error.code;
    });
};

export const getStudentsByGroup = async (id: string): Promise<Student[]> => {
  return await studentsCollection
    .where('group_id', '==', id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((document) => ({
        id: document.id,
        name: document.data().name,
        email: document.data().email,
        registration: document.data().registration,
        group_id: document.data().group_id
      })) as Student[];
    })
    .catch((error) => {
      throw error.code;
    });
};

export const deleteStudent = async (id: string): Promise<void> => {
  await studentsCollection.doc(id).delete();
};

export const deleteStudentByRegistration = async (
  registration: string
): Promise<void> => {
  await studentsCollection
    .where('registration', '==', registration)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    })
    .catch((error) => {
      throw error.code;
    });
};

export const updateStudent = async (
  student_id: string,
  name?: string,
  email?: string,
  registration?: number
) => {
  await studentsCollection
    .doc(student_id)
    .update({
      name,
      email,
      registration
    })
    .catch((error) => {
      throw error.code;
    });
};
