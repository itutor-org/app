import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../routes/auth.routes';

import {
  SignInContainer,
  LogoText,
  WelcomeText,
  InputWrapper,
  Input,
  PasswordInput,
  RecoverPasswordButton,
  RecoverPasswordButtonText,
  SignInButton,
  SignInButtonText,
  SignUpWrapper,
  SignUpText,
  SignUpLink,
  SignUpLinkText
} from './styles';

import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/useAuth';
import InformationModal from '../../../components/InformationModal';
import React from 'react';
import { useLoading } from '../../../contexts/loading';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export function SignIn({ navigation, route }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const { signIn } = useAuth();
  const { setLoading } = useLoading();
  const [modalTexts, setModalTexts] = React.useState({
    title: '',
    message: ''
  });
  const [showInformationModal, setShowInformationModal] = React.useState(false);

  async function handleSignIn(email: string, password: string) {
    setLoading(true);
    await signIn(email, password).catch((error: string) => {
      if (error === 'auth/user-not-found') {
        setModalTexts({
          title: 'Erro',
          message: 'Usuário não encontrado'
        });
      } else if (error === 'auth/wrong-password') {
        setModalTexts({
          title: 'Erro',
          message: 'Senha incorreta'
        });
      }
      setShowInformationModal(true);
    });
  }

  return (
    <SignInContainer>
      <LogoText>iTutor</LogoText>
      <WelcomeText>Seja bem vind@</WelcomeText>
      <InputWrapper>
        <MaterialIcons
          name="person"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="E-mail"
          value={email}
          keyboardType="email-address"
          onChangeText={(value) => setEmail(value)}
        />
      </InputWrapper>

      <InputWrapper>
        <MaterialIcons
          name="lock"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <PasswordInput
          placeholder="*************"
          secureTextEntry={isPasswordVisible}
          onChangeText={(value) => setPassword(value)}
        />
        <Entypo
          name={isPasswordVisible ? 'eye' : 'eye-with-line'}
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7, marginLeft: 7 }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      </InputWrapper>

      <RecoverPasswordButton
        onPress={() => navigation.navigate('RecoverPassword')}>
        <RecoverPasswordButtonText>
          Esqueci minha senha
        </RecoverPasswordButtonText>
      </RecoverPasswordButton>

      <SignInButton onPress={() => handleSignIn(email, password)}>
        <SignInButtonText>Entrar</SignInButtonText>
      </SignInButton>

      <SignUpWrapper>
        <SignUpText>Não tem uma conta?</SignUpText>
        <SignUpLink onPress={() => navigation.navigate('SignUp')}>
          <SignUpLinkText>Cadastre-se</SignUpLinkText>
        </SignUpLink>
      </SignUpWrapper>

      <InformationModal
        message={modalTexts.message}
        showModal={setShowInformationModal}
        handleAction={() => setShowInformationModal(false)}
        title={modalTexts.title}
        visible={showInformationModal}
      />
    </SignInContainer>
  );
}
