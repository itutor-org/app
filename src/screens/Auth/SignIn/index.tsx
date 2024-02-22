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
  Container,
  LogoImage
} from './styles';

import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/useAuth';
import React, { useEffect, useState } from 'react';

import { Alert, Keyboard, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from './schema';
import { SignInData } from '../../../entities/Forms/signIn.data';
import { InputForm } from '../../../components/Form/InputForm';
import { Button } from '../../../components/Button';
import { useLoading } from '../../../contexts/loading';
import { Image } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export function SignIn({ navigation, route }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const { signIn } = useAuth();
  const { loading, setLoading } = useLoading();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Event handler para quando o teclado é exibido
  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  // Event handler para quando o teclado é ocultado
  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    // Registrar os listeners para os eventos do teclado
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardDidShow
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardDidHide
    );

    // Remover os listeners quando o componente é desmontado
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      setLoading(false);
      if (error === 'auth/user-not-found') {
        Alert.alert('Erro!', 'E-mail não cadastrado');
      } else if (error === 'auth/wrong-password') {
        Alert.alert('Erro!', 'Senha incorreta');
      } else {
        Alert.alert('Erro!', error);
      }
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
      {!isKeyboardVisible && (
      <LogoImage source={require('../../../assets/images/logo.png')} />
      )}
      <WelcomeText>Seja bem-vindo(a)!</WelcomeText>
      
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
