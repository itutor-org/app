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
import {
  Alert,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import ModalComponent from '../../../components/Modal';
import { useAuth } from '../../../contexts/useAuth';
import { createGroup } from '../../../services/groupService';
import { StudentForValidation } from '../../../entities/student.entity';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddGroupSchema, AddStudentSchema } from './schema';
import { AddGroupData } from '../../../entities/Forms/AddGroup';
import Button from '../../../components/Button';
import { InputForm } from '../../../components/Form/InputForm';

type Props = NativeStackScreenProps<AppStackParamList, 'AddGroup'>;

export function AddGroup({ navigation, route }: Props) {
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [students, setStudents] = React.useState<StudentForValidation[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(AddGroupSchema)
  });

  const {
    control: controlStudent,
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    watch: watchStudent,
    reset: resetStudent,
    formState: { errors: errorsStudent }
  } = useForm({
    resolver: yupResolver(AddStudentSchema)
  });

  async function handleCreateGroup({ class_name, group_name }: AddGroupData) {
    await createGroup(
      user.id,
      group_name,
      students.length,
      class_name,
      students
    )
      .then(() => {
        Alert.alert('Sucesso', 'O grupo criado com sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home')
          }
        ]);
      })
      .catch((error) => {
        Alert.alert('Erro ao criar grupo', error.message);
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
      setStudents([...students, { name, email, registration }]);
      resetStudent();
      setModalVisible(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <Title>Criar Grupo</Title>

        <InputForm
          name="group_name"
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
          placeholder="Nome do grupo"
          autoCapitalize="sentences"
          autoCorrect={false}
        />

        <InputForm
          name="class_name"
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
          placeholder="Sigla da turma: Ex: CC2MA"
          autoCapitalize="sentences"
          autoCorrect={false}
        />

        <AddStudentArea>
          <Button
            text="Adicionar aluno"
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              marginBottom: 5,
              backgroundColor: theme.colors.medium_green
            }}
          />
          <StudentsList
            data={students}
            keyExtractor={({ registration }: StudentForValidation) =>
              registration
            }
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
                    onPress={() => {
                      setStudents(
                        students.filter(
                          (student) =>
                            student.registration !== item.registration
                        )
                      );
                    }}
                  />
                </ActionsButtonsWrapper>
              </StudentCard>
            )}
          />
        </AddStudentArea>

        <ModalComponent
          title="Adicionar aluno"
          showModal={() => {
            resetStudent();
            setModalVisible(!modalVisible);
          }}
          visible={modalVisible}
          showCloseButton={true}
          children={
            <>
              <InputForm
                name="name"
                control={controlStudent}
                error={
                  errorsStudent.name && (errorsStudent.name.message as any)
                }
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

        <Button text="Criar Grupo" onPress={handleSubmit(handleCreateGroup)} />
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default AddGroup;
