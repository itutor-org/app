import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';

import {
  Container,
  Title,
  AddStudentArea,
  StudentCard,
  StudentName,
  ActionsButtonsWrapper,
  StudentsList
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, StatusBar } from 'react-native';
import ModalComponent from '../../../components/Modal';
import { updateGroup } from '../../../services/groupService';
import {
  createStudent,
  deleteStudent,
  getStudentsByGroup
} from '../../../services/studentService';
import {
  Student,
  StudentForValidation
} from '../../../entities/student.entity';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditGroupSchema, EditStudentSchema } from './schema';
import { InputForm } from '../../../components/Form/InputForm';
import Button from '../../../components/Button';
import { EditGroupData } from '../../../entities/Forms/EditStudent';

type Props = NativeStackScreenProps<AppStackParamList, 'EditGroup'>;

export function EditGroup({ navigation, route }: Props) {
  const [registerModalVisible, setRegisterModalVisible] = React.useState(false);
  const [students, setStudents] = React.useState<Student[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(EditGroupSchema)
  });

  const {
    control: controlStudent,
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    watch: watchStudent,
    reset: resetStudent,
    formState: { errors: errorsStudent }
  } = useForm({
    resolver: yupResolver(EditStudentSchema)
  });

  async function handleUpdateGroup({ group_name, class_name }: EditGroupData) {
    await updateGroup(
      route.params.group_id,
      group_name,
      class_name,
      students.length
    )
      .then(() => {
        Alert.alert('Sucesso', 'O grupo foi editado com sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home')
          }
        ]);
      })
      .catch((error) => {
        Alert.alert('Erro ao editar grupo', error.message);
      });
  }

  async function handleDeleteStudent(studentID: string) {
    await deleteStudent(studentID)
      .then(() => {
        setStudents(students.filter((student) => student.id !== studentID));
      })
      .catch((error) => {
        Alert.alert('Erro ao deletar aluno', error.message);
      });
  }

  async function handleAddStudent({
    name,
    email,
    registration
  }: StudentForValidation) {
    if (
      students.find((student) => student.registration === registration) ||
      students.find((student) => student.email === email) ||
      students.find((student) => student.name === name)
    ) {
      Alert.alert('Erro', 'Esse aluno já foi adicionado ao grupo.');
    } else {
      await createStudent(name, email, registration, route.params.group_id)
        .then((student) => {
          setStudents([...students, student]);
          setRegisterModalVisible(false);
        })
        .catch((error) => {
          Alert.alert('Erro ao adicionar aluno', error.message);
        });
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
      <InputForm
        name="group_name"
        placeholder={route.params.name}
        control={control}
        error={errors.group_name && (errors.group_name.message as any)}
        icon={
          <MaterialIcons
            name="group"
            size={19}
            color={'#8D8D99'}
            style={{ marginRight: 10 }}
          />
        }
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect={false}
      />

      <InputForm
        name="class_name"
        placeholder={route.params.class_name}
        control={control}
        error={errors.class_name && (errors.class_name.message as any)}
        icon={
          <MaterialIcons
            name="class"
            size={19}
            color={'#8D8D99'}
            style={{ marginRight: 10 }}
          />
        }
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect={false}
      />

      <AddStudentArea>
        <Button
          text="Adicionar aluno"
          onPress={() => setRegisterModalVisible(!registerModalVisible)}
          style={{
            marginBottom: 5,
            backgroundColor: theme.colors.medium_green
          }}
        />
        <StudentsList
          showsVerticalScrollIndicator={true}
          data={students}
          keyExtractor={({ registration }: Student) => registration}
          renderItem={({ item }: any) => (
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
            <InputForm
              name="name"
              control={controlStudent}
              error={errorsStudent.name && (errorsStudent.name.message as any)}
              icon={
                <MaterialIcons
                  name="person"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 7 }}
                />
              }
              keyboardType="default"
              placeholder="Nome do aluno"
              autoCapitalize="sentences"
            />

            <InputForm
              name="email"
              control={controlStudent}
              error={
                errorsStudent.email && (errorsStudent.email.message as any)
              }
              icon={
                <MaterialIcons
                  name="email"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 7 }}
                />
              }
              keyboardType="email-address"
              placeholder="E-mail"
            />

            <InputForm
              name="registration"
              control={controlStudent}
              error={
                errorsStudent.registration &&
                (errorsStudent.registration.message as any)
              }
              icon={
                <MaterialIcons
                  name="assignment-ind"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 7 }}
                />
              }
              keyboardType="default"
              placeholder="Matrícula"
              autoCapitalize="sentences"
              autoCorrect={false}
              maxLength={8}
            />

            <Button
              text="Adicionar aluno"
              onPress={handleSubmitStudent(handleAddStudent)}
            />
          </>
        }
      />

      <Button text="Editar Grupo" onPress={handleSubmit(handleUpdateGroup)} />
    </Container>
  );
}

export default EditGroup;
