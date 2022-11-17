import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../routes/auth.routes';

import { Container, LogoText, Title } from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, ScrollView } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';
import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecoverPasswordSchema } from './schema';

import { RecoverPasswordData } from '../../../entities/Forms/recoverPassword.data';

type Props = NativeStackScreenProps<AuthStackParamList, 'RecoverPassword'>;

export function RecoverPassword({ navigation, route }: Props) {
  const { recoverPassword } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RecoverPasswordSchema)
  });

  async function handleRecoverPassword({ email }: RecoverPasswordData) {
    try {
      await recoverPassword(email);
      Alert.alert(
        'Sucesso!',
        'Enviamos um e-mail para você recuperar sua senha',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('SignIn')
          }
        ]
      );
    } catch (error) {
      if (error === 'auth/user-not-found') {
        Alert.alert('Erro!', 'E-mail não cadastrado');
      } else {
        Alert.alert('Erro!', error);
      }
    }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={theme.colors.dark_yellow}
          style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
          onPress={() => navigation.navigate('SignIn')}
        />
        <LogoText>ITutor</LogoText>
        <Title>Recuperação de senha</Title>

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

        <Button
          text="Recuperar senha"
          onPress={handleSubmit(handleRecoverPassword)}
        />
      </ScrollView>
    </Container>
  );
}
