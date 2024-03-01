import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';

import { Container, Title } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert } from 'react-native';
import ModalComponent from '../../../components/Modal';
import { useAuth } from '../../../contexts/useAuth';
import { createGroup } from '../../../services/groupService';
import { Student } from '../../../entities/student.entity';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddGroupSchema, AddStudentSchema } from './schema';
import { AddGroupData } from '../../../entities/Forms/addGroup.data';
import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/Form/InputForm';
import { StudentArea } from '../../../components/StudentArea';
import { useLoading } from '../../../contexts/loading';

type Props = NativeStackScreenProps<AppStackParamList, 'AddGroup'>;

export function AddGroup({ navigation, route }: Props) {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [students, setStudents] = React.useState<Student[]>([]);

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
    try {
      setLoading(true);
      await createGroup(
        user.id,
        group_name,
        students.length,
        class_name,
        students
      );

      setLoading(false);

      Alert.alert('Sucesso', 'O grupo criado com sucesso!', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home')
        }
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro ao criar grupo', error.message);
    }
  }

  async function handleAddStudent({ name, email, registration }: Student) {
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

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, []);

  return (
    <Container>
      <MaterialIcons
        name="arrow-back"
        size={30}
        color={theme.colors.light_orange}
        style={{
          position: 'absolute',
          left: 20,
          top: 20
        }}
        onPress={() =>
          Alert.alert(
            'Atenção',
            'Deseja sair da criação? Sua alterações serão perdidas',
            [
              {
                text: 'Não',
                style: 'cancel'
              },
              {
                text: 'Sim',
                onPress: () => navigation.navigate('Home')
              }
            ]
          )
        }
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

      <StudentArea
        students={students}
        handleDeleteStudent={(registration) =>
          setStudents(
            students.filter((student) => student.registration !== registration)
          )
        }
        openRegisterModal={() => setModalVisible(true)}
      />

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

      <Button text="Criar Grupo" onPress={handleSubmit(handleCreateGroup)} />
    </Container>
  );
}

export default AddGroup;
