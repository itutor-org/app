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
import { useAuth } from '../../../contexts/useAuth';
import { updateGroup } from '../../../services/groupService';
import {
  createStudent,
  deleteStudent,
  getStudentsByGroup
} from '../../../services/studentService';
import { Student } from '../AddGroup';

type Props = NativeStackScreenProps<AppStackParamList, 'EditGroup'>;

export function EditGroup({ navigation, route }: Props) {
  const { user } = useAuth();

  const [registerModalVisible, setRegisterModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [groupName, setGroupName] = React.useState(route.params.name);
  const [participantsNumber, setParticipantsNumber] = React.useState(
    route.params.participantsNumber
  );
  const [className, setClassName] = React.useState(route.params.className);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [student, setStudent] = React.useState<Student>();

  async function handleUpdateGroup(groupID: string) {
    await updateGroup(groupID, groupName, className, participantsNumber).then(
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
        route.params.groupId
      );

      setStudents((prevState) => [...prevState, student]),
        setStudent({} as Student),
        setRegisterModalVisible(!registerModalVisible);
    } else {
      console.log('Email inválido');
    }
  }

  async function getStudentsFromGroup() {
    const students = await getStudentsByGroup(route.params.groupId);
    setStudents(students);
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
          name="people"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          keyboardType="numeric"
          value={participantsNumber}
          placeholder="Número de participantes"
          onChangeText={(value: number) => setParticipantsNumber(value)}
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
        <ActionsButtonsWrapper>
          <StudentsList
            data={students}
            keyExtractor={({ registration }: Student) => registration}
            renderItem={({ item }) => (
              <StudentCard key={item.id}>
                <StudentName>{item.name}</StudentName>
                <ActionsButtonsWrapper>
                  <Feather
                    name="edit"
                    size={25}
                    color={theme.colors.gray_200}
                    onPress={() => setEditModalVisible(!editModalVisible)}
                  />
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
        </ActionsButtonsWrapper>
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

      <SubmitButton onPress={() => handleUpdateGroup(route.params.groupId)}>
        <ButtonText>Confirmar</ButtonText>
      </SubmitButton>
    </Container>
  );
}

export default EditGroup;
