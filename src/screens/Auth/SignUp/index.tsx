import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { AuthStackParamList } from '../../../routes/auth.routes';

import { ActionText, SubmitButton, SubmitButtonText } from './styles';

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '../../../components/Form/InputForm';
import { SignUpSchema } from './schema';
import { SignUpData } from '../../../entities/Forms/SignUp';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUp({ navigation, route }: Props) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignUpSchema)
  });

  const { registerUser } = useAuth();

  async function handleRegister(form: SignUpData) {
    await registerUser(form.name, form.email, form.registration, form.password)
      .then(() => {
        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('SignIn')
            }
          ]
        );
      })
      .catch((error) => {
        if (error === 'auth/email-already-in-use') {
          Alert.alert(
            'Ops! Esse e-mail já está sendo utilizado.',
            'Por favor, tente novamente.'
          );
        } else if (error === 'auth/invalid-email') {
          Alert.alert(
            'Ops! Esse e-mail é inválido.',
            'Por favor, tente novamente.'
          );
        }
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 25,
          backgroundColor: theme.colors.dark_blue
        }}>
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
        <InputForm
          name="name"
          control={control}
          error={errors.name && (errors.name.message as any)}
          icon={
            <MaterialIcons
              name="person"
              size={19}
              color={'#8D8D99'}
              style={{ marginRight: 10 }}
            />
          }
          keyboardType="default"
          placeholder="Nome"
          autoCapitalize="sentences"
          autoCorrect={false}
        />
        <InputForm
          name="email"
          control={control}
          error={errors.email && (errors.email.message as any)}
          icon={
            <MaterialIcons
              name="email"
              size={19}
              color={'#8D8D99'}
              style={{ marginRight: 10 }}
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
              style={{ marginRight: 10 }}
            />
          }
          keyboardType="visible-password"
          placeholder="Senha"
        />
        <InputForm
          name="password_confirmation"
          control={control}
          error={
            errors.password_confirmation &&
            (errors.password_confirmation.message as any)
          }
          icon={
            <MaterialIcons
              name="lock"
              size={19}
              color={'#8D8D99'}
              style={{ marginRight: 10 }}
            />
          }
          keyboardType="visible-password"
          placeholder="Confirme sua senha"
        />
        <InputForm
          name="registration"
          control={control}
          error={errors.registration && (errors.registration.message as any)}
          icon={
            <Octicons
              name="number"
              size={19}
              color={'#8D8D99'}
              style={{ marginRight: 10 }}
            />
          }
          keyboardType="numeric"
          placeholder="Registration"
          maxLength={8}
        />

        <SubmitButton onPress={handleSubmit(handleRegister)}>
          <SubmitButtonText>Cadastrar</SubmitButtonText>
        </SubmitButton>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
