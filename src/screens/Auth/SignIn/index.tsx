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
  SignUpLinkText
} from './styles';

import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';
import { useLoading } from '../../../contexts/loading';
import { Alert, ScrollView } from 'react-native';
import { theme } from '../../../styles/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from './schema';
import { SignInData } from '../../../entities/Forms/SignIn';
import { InputForm } from '../../../components/Form/InputForm';
import Button from '../../../components/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export function SignIn({ navigation, route }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const { signIn } = useAuth();
  const { setLoading } = useLoading();

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
    setLoading(true);
    await signIn(email, password).catch((error: string) => {
      setLoading(false);
      if (error === 'auth/user-not-found')
        Alert.alert('Erro na autenticação', 'E-mail não cadastrado.');
      else if (error === 'auth/wrong-password')
        Alert.alert('Erro na autenticação', 'Senha incorreta.');
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: theme.colors.dark_blue
      }}>
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
            style={{ marginLeft: -20 }}
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
    </ScrollView>
  );
}
