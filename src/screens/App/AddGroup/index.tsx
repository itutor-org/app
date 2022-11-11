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
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { StatusBar } from 'react-native';
import ModalComponent from '../../../components/Modal';
import { useAuth } from '../../../contexts/useAuth';
import { createGroup } from '../../../services/groupService';
import { StudentDTO } from '../../../entities/student.entity';

type Props = NativeStackScreenProps<AppStackParamList, 'AddGroup'>;

export function AddGroup({ navigation, route }: Props) {
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [className, setClassName] = React.useState('');
  const [students, setStudents] = React.useState<StudentDTO[]>([]);
  const [student, setStudent] = React.useState<StudentDTO>();

  async function handleCreateGroup() {
    await createGroup(
      user.id,
      groupName,
      students.length,
      className,
      students
    ).then(() => {
      setInfoModalVisible(!infoModalVisible);
    });
  }

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
      <Title>Criar Grupo</Title>
      <InputWrapper>
        <MaterialIcons
          name="person"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="Nome"
          autoCapitalize="characters"
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
          autoCapitalize="characters"
          onChangeText={(value: string) => setClassName(value)}
        />
      </InputWrapper>

      <AddStudentArea>
        <AddStudentButton onPress={() => setModalVisible(!modalVisible)}>
          <ButtonText>Adicionar aluno</ButtonText>
        </AddStudentButton>
        <ActionsButtonsWrapper>
          <StudentsList
            data={students}
            keyExtractor={({ registration }: StudentDTO) => registration}
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
                    onPress={() => {
                      setStudents(
                        students.filter(
                          (s) => s.registration !== item.registration
                        )
                      );
                    }}
                  />
                </ActionsButtonsWrapper>
              </StudentCard>
            )}
          />
        </ActionsButtonsWrapper>
      </AddStudentArea>

      <ModalComponent
        title="Adicionar aluno"
        showModal={setModalVisible}
        visible={modalVisible}
        showCloseButton={true}
        height={350}
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
                maxLength={8}
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
            <SubmitButton
              onPress={() => {
                if (student.email.includes('@aluno.cesupa.br')) {
                  setStudents((prevState) => [...prevState, student]),
                    setModalVisible(!modalVisible);
                } else {
                  console.log('Email inválido');
                }
              }}>
              <ButtonText>Adicionar Aluno</ButtonText>
            </SubmitButton>
          </>
        }
      />

      <ModalComponent
        title="Sucesso"
        showModal={setInfoModalVisible}
        visible={infoModalVisible}
        height={200}
        children={
          <>
            <InfoModalText>Grupo criado com sucesso</InfoModalText>
            <SubmitButton onPress={() => navigation.navigate('Home')}>
              <ButtonText>Ok</ButtonText>
            </SubmitButton>
          </>
        }
      />

      <SubmitButton onPress={handleCreateGroup}>
        <ButtonText>Cadastrar</ButtonText>
      </SubmitButton>
    </Container>
  );
}

export default AddGroup;
