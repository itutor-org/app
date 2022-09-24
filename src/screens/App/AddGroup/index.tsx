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
  ActionsButtonsWrapper
} from './styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { StatusBar } from 'react-native';

type Props = NativeStackScreenProps<AppStackParamList, 'AddGroup'>;

export function AddGroup({ navigation, route }: Props) {
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
          // onChangeText={(value) => setEmail(value)}
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
          placeholder="Número de participantes"
          // onChangeText={(value) => setEmail(value)}
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
          // onChangeText={(value) => setEmail(value)}
        />
      </InputWrapper>

      <AddStudentArea>
        <AddStudentButton>
          <ButtonText>Adicionar aluno</ButtonText>
        </AddStudentButton>
        <ActionsButtonsWrapper>
          <StudentCard>
            <StudentName>Lucas Freitas</StudentName>
            <ActionsButtonsWrapper>
              <Feather name="edit" size={25} color={theme.colors.gray_200} />
              <MaterialIcons
                name="delete"
                size={25}
                color={theme.colors.gray_200}
                style={{
                  marginLeft: 15
                }}
              />
            </ActionsButtonsWrapper>
          </StudentCard>
        </ActionsButtonsWrapper>
      </AddStudentArea>

      <SubmitButton>
        <ButtonText>Cadastrar</ButtonText>
      </SubmitButton>
    </Container>
  );
}

export default AddGroup;
