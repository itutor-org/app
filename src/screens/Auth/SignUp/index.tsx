import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StatusBar, Text } from 'react-native';
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
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: ''
  });
  const [hasMoreThanEightChar, setHasMoreThanEightChar] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUpperAndLowercaseChar, setHasUpperAndLowercaseChar] =
    useState(false);

  const { registerUser } = useAuth();

  async function handleSignUp(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (password === confirmPassword) {
      await registerUser(email, password).then(() => {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('SignIn')
          }
        ]);
      });
    } else {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
  }

  async function handlePasswordVerification(password: string) {
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
          name="email"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="E-mail"
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
          placeholder="Password"
          onChangeText={(value) => {
            setPassword({ ...password, password: value }),
              handlePasswordVerification(value);
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
          placeholder="Password"
          onChangeText={(value) => {
            setPassword({ ...password, confirmPassword: value }),
              handlePasswordVerification(value);
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

      <SubmitButton
        onPress={() =>
          handleSignUp(email, password.password, password.confirmPassword)
        }>
        <SubmitButtonText>Cadastrar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
