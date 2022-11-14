import firestore from '@react-native-firebase/firestore';
import { Group } from '../entities/group.entity';
import { StudentDTO } from '../entities/student.entity';
import {
  createStudent,
  deleteStudent,
  getStudentsByGroup
} from './studentService';

import { deleteDiscussion, getDiscussions } from './discussionService';
import { deleteInteractionsByDiscussion } from './interactionService';

const groupsCollection = firestore().collection('groups');

export const getGroups = async (id: string): Promise<Group[]> => {
  return await groupsCollection
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
      throw error.code;
    });
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
      students.forEach(async (item: StudentDTO) => {
        await createStudent(item.name, item.email, item.registration, group.id);
      });
    })
    .catch((error) => {
      throw error.code;
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
    .catch((error) => {
      throw error.code;
    });
};

export const deleteGroup = async (group_id: string) => {
  const discussions = await getDiscussions(group_id);

  discussions.forEach(async (discussion) => {
    await deleteInteractionsByDiscussion(discussion.id);
  });

  discussions.forEach(async (discussion) => {
    await deleteDiscussion(discussion.id);
  });

  const students = await getStudentsByGroup(group_id);

  students.forEach(async (student) => {
    await deleteStudent(student.id);
  });

  await groupsCollection
    .doc(group_id)
    .delete()
    .catch((error) => {
      throw error.code;
    });
};
