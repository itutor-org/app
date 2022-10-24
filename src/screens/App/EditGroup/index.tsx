import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';

import {
  Container,
  Title,
  InputWrapper,
  Input,
  SubmitButton,
  ButtonText,
  AddStudentArea,
  AddStudentButton,
  StudentCard,
  StudentName,
  ActionsButtonsWrapper,
  StudentsList,
  InfoModalText
} from './styles';
import { MaterialIcons, Feather, Octicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { StatusBar } from 'react-native';
import ModalComponent from '../../../components/Modal';
import { updateGroup } from '../../../services/groupService';
import {
  createStudent,
  deleteStudent,
  getStudentsByGroup
} from '../../../services/studentService';
import { Student } from '../AddGroup';

type Props = NativeStackScreenProps<AppStackParamList, 'EditGroup'>;

export function EditGroup({ navigation, route }: Props) {
  const [registerModalVisible, setRegisterModalVisible] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [groupName, setGroupName] = React.useState(route.params.name);
  const [className, setClassName] = React.useState(route.params.class_name);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [student, setStudent] = React.useState<Student>();

  async function handleUpdateGroup(group_id: string) {
    await updateGroup(group_id, groupName, className, students.length).then(
      () => {
        setInfoModalVisible(!infoModalVisible);
      }
    );
  }

  async function handleDeleteStudent(studentID: string) {
    await deleteStudent(studentID).then(() => {
      setStudents(students.filter((student) => student.id !== studentID));
    });
  }

  async function handleAddStudent() {
    if (student.email.includes('@aluno.cesupa.br')) {
      createStudent(
        student.name,
        student.email,
        student.registration,
        route.params.group_id
      );

      setStudents((prevState) => [...prevState, student]),
        setStudent({} as Student),
        setRegisterModalVisible(!registerModalVisible);
    } else {
      console.log('Email inválido');
    }
  }

  async function getStudentsFromGroup() {
    const data = await getStudentsByGroup(route.params.group_id);
    setStudents(data);
  }

  React.useEffect(() => {
    getStudentsFromGroup();
  }, []);

  return (
    <Container>
      <MaterialIcons
        name="arrow-back"
        size={30}
        color={theme.colors.dark_yellow}
        style={{
          position: 'absolute',
          left: 15,
          top: StatusBar.currentHeight + 15
        }}
        onPress={() => navigation.navigate('Home')}
      />
      <Title>Editar Grupo</Title>
      <InputWrapper>
        <MaterialIcons
          name="person"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="Nome"
          value={groupName}
          onChangeText={(value: string) => setGroupName(value)}
        />
      </InputWrapper>

      <InputWrapper>
        <MaterialIcons
          name="class"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="Nome da turma"
          value={className}
          onChangeText={(value: string) => setClassName(value)}
        />
      </InputWrapper>

      <AddStudentArea>
        <AddStudentButton
          onPress={() => setRegisterModalVisible(!registerModalVisible)}>
          <ButtonText>Adicionar aluno</ButtonText>
        </AddStudentButton>
        <StudentsList
          showsVerticalScrollIndicator={false}
          data={students}
          keyExtractor={({ registration }: Student) => registration}
          renderItem={({ item }) => (
            <StudentCard key={item.id}>
              <StudentName>{item.name}</StudentName>
              <ActionsButtonsWrapper>
                <MaterialIcons
                  name="delete"
                  size={25}
                  color={theme.colors.gray_200}
                  style={{
                    marginLeft: 15
                  }}
                  onPress={() => handleDeleteStudent(item.id)}
                />
              </ActionsButtonsWrapper>
            </StudentCard>
          )}
        />
      </AddStudentArea>

      <ModalComponent
        title="Adicionar aluno"
        showModal={setRegisterModalVisible}
        visible={registerModalVisible}
        showCloseButton={true}
        children={
          <>
            <InputWrapper>
              <MaterialIcons
                name="person"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Nome"
                onChangeText={(value: string) =>
                  setStudent({ ...student, name: value })
                }
              />
            </InputWrapper>
            <InputWrapper>
              <Octicons
                name="number"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 10 }}
              />
              <Input
                placeholder="Matricula"
                keyboardType="numeric"
                onChangeText={(value: string) =>
                  setStudent({ ...student, registration: value })
                }
              />
            </InputWrapper>
            <InputWrapper>
              <MaterialIcons
                name="email"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value: string) =>
                  setStudent({ ...student, email: value })
                }
              />
            </InputWrapper>
            <SubmitButton onPress={handleAddStudent}>
              <ButtonText>Adicionar Aluno</ButtonText>
            </SubmitButton>
          </>
        }
      />

      <ModalComponent
        title="Sucesso"
        showModal={setInfoModalVisible}
        visible={infoModalVisible}
        children={
          <>
            <InfoModalText>Grupo editado com sucesso</InfoModalText>
            <SubmitButton onPress={() => navigation.navigate('Home')}>
              <ButtonText>Ok</ButtonText>
            </SubmitButton>
          </>
        }
      />

      <SubmitButton onPress={() => handleUpdateGroup(route.params.group_id)}>
        <ButtonText>Confirmar</ButtonText>
      </SubmitButton>
    </Container>
  );
}

export default EditGroup;
