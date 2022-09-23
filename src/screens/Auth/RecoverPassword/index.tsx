import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../routes/auth.routes';

import {
  Container,
  LogoText,
  ActionText,
  InputWrapper,
  Input,
  SubmitButton,
  SubmitButtonText
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, StatusBar } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../../contexts/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'RecoverPassword'>;

export function RecoverPassword({ navigation, route }: Props) {
  const [email, setEmail] = useState('');
  const { recoverPassword } = useAuth();

  async function handleRecoverPassword(email: string) {
    await recoverPassword(email)
      .then(() => {
        Alert.alert(
          'Sucesso',
          'Email enviado com sucesso, cheque seu email para recuperar a senha',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('SignIn')
            }
          ]
        );
      })
      .catch(() => {
        Alert.alert(
          'Erro',
          'Erro ao enviar email, cheque se o email está correto',
          [
            {
              text: 'Ok'
            }
          ]
        );
      });
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
      <ActionText>Recuperação de senha</ActionText>
      <InputWrapper>
        <MaterialIcons
          name="email"
          size={19}
          color={'#8D8D99'}
          style={{ marginRight: 7 }}
        />
        <Input
          placeholder="Digite seu e-mail"
          onChangeText={(value) => setEmail(value)}
        />
      </InputWrapper>

      <SubmitButton onPress={() => handleRecoverPassword(email)}>
        <SubmitButtonText>Mandar Instruções</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
