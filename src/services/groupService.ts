import firestore from '@react-native-firebase/firestore';
import { Student } from '../screens/App/AddGroup';
import {
  createStudent,
  deleteStudent,
  getStudentsByGroup
} from './studentService';

const groupsCollection = firestore().collection('groups');

export interface Group {
  id: string;
  user_id: string;
  name: string;
  participants_number: number;
  class_name: string;
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
          class_name: document.data().class_name
        };

        return group;
      });

      return groups;
    })
    .catch((error) => {
      throw console.log(error.code);
    });

  return data;
};

export const getGroupByName = async (
  user_id: string,
  name: string
): Promise<Group[]> => {
  const data = await groupsCollection
    .where('user_id', '==', user_id)
    .where('name', '==', name)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((document) => ({
        id: document.id,
        user_id: document.data().user_id,
        name: document.data().name,
        participants_number: document.data().participants_number,
        class_name: document.data().class_name
      })) as Group[];
    })
    .catch((error) => {
      throw console.log(error.code);
    });

  return data;
};

export const createGroup = async (
  user_id: string,
  name: string,
  participants_number: number,
  class_name: string,
  students: any
) => {
  await groupsCollection
    .add({
      user_id,
      name,
      participants_number,
      class_name
    })
    .then(async (group) => {
      students.forEach(async (item: Student) => {
        await createStudent(item.name, item.email, item.registration, group.id);
      });
    })
    .catch((error) => {
      console.log(error.code);
    });
};

export const updateGroup = async (
  group_id: string,
  name: string,
  class_name: string,
  participants_number: number
) => {
  await groupsCollection
    .doc(group_id)
    .update({
      name: name,
      class_name: class_name,
      participants_number: participants_number
    })
    .then(() => {
      console.log('Group updated!');
    })
    .catch((error) => {
      console.log(error.code);
    });
};

export const deleteGroup = async (group_id: string) => {
  await getStudentsByGroup(group_id).then(async (students) => {
    students.forEach(async (student) => {
      await deleteStudent(student.id);
    });
  });

  await groupsCollection
    .doc(group_id)
    .delete()
    .then(() => {
      console.log('Group deleted');
    })
    .catch((error) => {
      console.log(error.code);
    });
};
