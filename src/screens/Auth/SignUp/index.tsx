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

  const { registerUser } = useAuth();

  async function handleSignUp(
    email: string,
    password: string,
    registration: string
  ) {
    if (!hasMoreThanEightChar || !hasSpecialChar || !hasUpperAndLowercaseChar) {
      Alert.alert('Erro', 'As senha não atende aos requisitos mínimos');
      return;
    } else if (!email.includes('@aluno.cesupa.br')) {
      Alert.alert('Erro', 'Você precisa usar um email institucional');
      return;
    } else {
      await registerUser(name, email, registration, password)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('SignIn')
            }
          ]);
        })
        .catch((error) => {
          if (error === 'auth/email-already-in-use') {
            Alert.alert('Erro', 'Email já cadastrado');
          } else if (error === 'auth/invalid-email') {
            Alert.alert('Erro', 'Email inválido');
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
      <LogoText>ITutor</LogoText>
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
    </Container>
  );
}
