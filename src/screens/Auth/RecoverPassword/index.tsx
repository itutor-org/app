import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../routes/auth.routes';

import { Container, LogoImage, Title } from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, Keyboard, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecoverPasswordSchema } from './schema';

import { RecoverPasswordData } from '../../../entities/Forms/recoverPassword.data';
import { useLoading } from '../../../contexts/loading';

type Props = NativeStackScreenProps<AuthStackParamList, 'RecoverPassword'>;

export function RecoverPassword({ navigation, route }: Props) {
  const { recoverPassword } = useAuth();
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
    resolver: yupResolver(RecoverPasswordSchema)
  });

  async function handleRecoverPassword({ email }: RecoverPasswordData) {
    try {
      setLoading(true);
      await recoverPassword(email);

      setLoading(false);
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
      setLoading(false);
      if (error === 'auth/user-not-found') {
        Alert.alert('Erro!', 'E-mail não cadastrado');
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={theme.colors.light_orange}
          style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
          onPress={() => navigation.navigate('SignIn')}
        />
         {!isKeyboardVisible && (
        <LogoImage source={require('../../../assets/images/logo.png')} />
        )}
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
