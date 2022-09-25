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
import { MaterialIcons, Feather, Octicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import {
  Alert,
  Modal,
  Pressable,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

type Props = NativeStackScreenProps<AppStackParamList, 'AddGroup'>;

export function AddGroup({ navigation, route }: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);

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
        <AddStudentButton onPress={() => setModalVisible(!modalVisible)}>
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

      <Modal
        animationType="fade"
        hardwareAccelerated
        presentationStyle="overFullScreen"
        onOrientationChange={() => setModalVisible(!modalVisible)}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={{ color: 'black' }}>Adicionar aluno</Title>
            <InputWrapper>
              <MaterialIcons
                name="person"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Nome da turma"
                // onChangeText={(value) => setEmail(value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Octicons
                name="number"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Nome da turma"
                // onChangeText={(value) => setEmail(value)}
              />
            </InputWrapper>
            <SubmitButton onPress={() => setModalVisible(!modalVisible)}>
              <ButtonText>Cadastrar</ButtonText>
            </SubmitButton>
          </View>
        </View>
      </Modal>

      <SubmitButton>
        <ButtonText>Cadastrar</ButtonText>
      </SubmitButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0000007f'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default AddGroup;
