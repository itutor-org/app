import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { AuthStackParamList } from '../../../routes/auth.routes';

import { SignInContainer, SignInWrapper } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'RecoverPassword'>;

export function RecoverPassword({ navigation, route }: Props) {
  return (
    <SignInContainer>
      <SignInWrapper>
        <Text>RecoverPassword</Text>
      </SignInWrapper>
    </SignInContainer>
  );
}
