import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StatusBar } from 'react-native';
import { AuthStackParamList } from '../../../routes/auth.routes';

import {
  Container,
  LogoText,
  ActionText,
  InputWrapper,
  Input,
  SubmitButton,
  SubmitButtonText,
  HintText,
  Hints
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { useState } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';
import InformationModal from '../../../components/InformationModal';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUp({ navigation, route }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registration, setRegistration] = useState('');
  const [name, setName] = useState('');
  const [hasMoreThanEightChar, setHasMoreThanEightChar] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUpperAndLowercaseChar, setHasUpperAndLowercaseChar] =
    useState(false);

  const [modalTexts, setModalTexts] = React.useState({
    title: '',
    message: ''
  });
  const [showInformationModal, setShowInformationModal] = React.useState(false);

  const { registerUser } = useAuth();

  async function handleSignUp(
    email: string,
    password: string,
    registration: string
  ) {
    if (!hasMoreThanEightChar || !hasSpecialChar || !hasUpperAndLowercaseChar) {
      setModalTexts({
        title: 'Senha inválida',
        message: 'As senha não atende aos requisitos mínimos'
      });
      setShowInformationModal(true);
      return;
    } else if (!email.includes('prof.cesupa.br')) {
      setModalTexts({
        title: 'Email inválido',
        message: 'Você precisa usar um email institucional'
      });
      setShowInformationModal(true);
      return;
    } else {
      await registerUser(name, email, registration, password)
        .then(() => {
          setModalTexts({
            title: 'Cadastro realizado',
            message: 'Seu cadastro foi realizado com sucesso'
          });
          setShowInformationModal(true);
        })
        .catch((error) => {
          if (error === 'auth/email-already-in-use') {
            setModalTexts({
              title: 'Erro no cadastro',
              message: 'Esse email já está cadastrado'
            });
            setShowInformationModal(true);
          } else if (error === 'auth/invalid-email') {
            setModalTexts({
              title: 'Erro no cadastro',
              message: 'Esse email é inválido'
            });
            setShowInformationModal(true);
          }
        });
    }
  }

  function handlePasswordVerification(password: string) {
    const hasMoreThanEightChar = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperAndLowercaseChar =
      /[a-z]/.test(password) && /[A-Z]/.test(password);

    setHasMoreThanEightChar(hasMoreThanEightChar);
    setHasSpecialChar(hasSpecialChar);
    setHasUpperAndLowercaseChar(hasUpperAndLowercaseChar);
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
        onPress={() => navigation.navigate('SignIn')}
      />
      <ActionText>Cadastro</ActionText>
      <InputWrapper>
        <MaterialIcons
          name="person"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="John Doe"
          onChangeText={(value) => {
            setName(value);
          }}
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
          placeholder="johndoe@mail.com"
          keyboardType="email-address"
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <MaterialIcons
          name="lock"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="**********"
          onChangeText={(value) => {
            setPassword(value), handlePasswordVerification(value);
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <MaterialIcons
          name="lock"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="19070002"
          keyboardType="numeric"
          maxLength={8}
          onChangeText={(value) => {
            setRegistration(value);
          }}
        />
      </InputWrapper>

      <Hints>
        <HintText isPresent={hasMoreThanEightChar}>
          - Senha com mais de 8 caracteres
        </HintText>
        <HintText isPresent={hasSpecialChar}>
          - Senha com caracteres especiais
        </HintText>
        <HintText isPresent={hasUpperAndLowercaseChar}>
          - Senha com letras maiúsculas e minusculas
        </HintText>
      </Hints>

      <SubmitButton onPress={() => handleSignUp(email, password, registration)}>
        <SubmitButtonText>Cadastrar</SubmitButtonText>
      </SubmitButton>

      <InformationModal
        message={modalTexts.message}
        showModal={setShowInformationModal}
        handleAction={() => {
          if (modalTexts.message === 'Seu cadastro foi realizado com sucesso') {
            navigation.navigate('SignIn');
          } else {
            setShowInformationModal(false);
          }
        }}
        title={modalTexts.title}
        visible={showInformationModal}
      />
    </Container>
  );
}
