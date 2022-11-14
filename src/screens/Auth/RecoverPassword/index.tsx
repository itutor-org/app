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
import { StatusBar } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import React from 'react';
import InformationModal from '../../../components/InformationModal';

type Props = NativeStackScreenProps<AuthStackParamList, 'RecoverPassword'>;

export function RecoverPassword({ navigation, route }: Props) {
  const [email, setEmail] = React.useState('');
  const { recoverPassword } = useAuth();

  const [modalTexts, setModalTexts] = React.useState({
    title: '',
    message: ''
  });
  const [showInformationModal, setShowInformationModal] = React.useState(false);

  async function handleRecoverPassword(email: string) {
    if (!email.includes('.cesupa.br')) {
      setModalTexts({
        title: 'Email inválido',
        message: 'Você precisa usar um email institucional'
      });
      setShowInformationModal(true);
      return;
    } else {
      await recoverPassword(email)
        .then(() => {
          setModalTexts({
            title: 'Email enviado',
            message:
              'Um email foi enviado para você com as instruções para recuperar sua senha'
          });
          setShowInformationModal(true);
        })
        .catch((error) => {
          if (error === 'auth/user-not-found') {
            setModalTexts({
              title: 'Email não encontrado',
              message: 'Não existe nenhum usuário com esse email'
            });
            setShowInformationModal(true);
          }
        });
    }
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

      <InformationModal
        message={modalTexts.message}
        showModal={setShowInformationModal}
        handleAction={() => {
          if (
            modalTexts.message !==
            'Email enviado com sucesso, cheque seu email para recuperar a senha'
          ) {
            setShowInformationModal(false);
          } else {
            navigation.navigate('SignIn');
          }
        }}
        title={modalTexts.title}
        visible={showInformationModal}
      />
    </Container>
  );
}
