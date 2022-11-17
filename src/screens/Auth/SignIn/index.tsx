import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../routes/auth.routes';

import {
  LogoText,
  WelcomeText,
  RecoverPasswordButton,
  RecoverPasswordButtonText,
  SignUpWrapper,
  SignUpText,
  SignUpLink,
  SignUpLinkText,
  Container
} from './styles';

import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';

import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from './schema';
import { SignInData } from '../../../entities/Forms/signIn.data';
import { InputForm } from '../../../components/Form/InputForm';
import { Button } from '../../../components/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export function SignIn({ navigation, route }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const { signIn } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInSchema)
  });

  async function handleSignIn({ email, password }: SignInData) {
    try {
      await signIn(email, password);
    } catch (error) {
      if (error === 'auth/user-not-found') {
        Alert.alert('Erro!', 'E-mail não cadastrado');
      } else if (error === 'auth/wrong-password') {
        Alert.alert('Erro!', 'Senha incorreta');
      } else {
        Alert.alert('Erro!', error);
      }
    }
  }

  return (
    <Container>
      <LogoText>iTutor</LogoText>
      <WelcomeText>Seja bem vind@</WelcomeText>

      <InputForm
        name="email"
        control={control}
        error={errors.email && (errors.email.message as any)}
        icon={
          <MaterialIcons
            name="person"
            size={19}
            color={'#8D8D99'}
            style={{ marginRight: 7 }}
          />
        }
        keyboardType="email-address"
        placeholder="Email"
      />

      <InputForm
        name="password"
        control={control}
        error={errors.password && (errors.password.message as any)}
        icon={
          <MaterialIcons
            name="lock"
            size={19}
            color={'#8D8D99'}
            style={{ marginRight: 7 }}
          />
        }
        secureTextEntry={isPasswordVisible}
        keyboardType="default"
        placeholder="Senha"
        isPassword={true}
        PasswordIcon={
          <Entypo
            name={isPasswordVisible ? 'eye' : 'eye-with-line'}
            size={19}
            color={'#8D8D99'}
            style={{ marginLeft: -20, zIndex: 1 }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
      />

      <RecoverPasswordButton
        onPress={() => navigation.navigate('RecoverPassword')}>
        <RecoverPasswordButtonText>
          Esqueci minha senha
        </RecoverPasswordButtonText>
      </RecoverPasswordButton>

      <Button onPress={handleSubmit(handleSignIn)} text="Entrar" />

      <SignUpWrapper>
        <SignUpText>Não tem uma conta?</SignUpText>
        <SignUpLink onPress={() => navigation.navigate('SignUp')}>
          <SignUpLinkText>Cadastre-se</SignUpLinkText>
        </SignUpLink>
      </SignUpWrapper>
    </Container>
  );
}
