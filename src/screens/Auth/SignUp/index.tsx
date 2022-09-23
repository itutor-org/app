import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { AuthStackParamList } from '../../../routes/auth.routes';

import { SignInContainer, SignInWrapper } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUp({ navigation, route }: Props) {
  return (
    <SignInContainer>
      <SignInWrapper>
        <Text>SignUp</Text>
      </SignInWrapper>
    </SignInContainer>
  );
}
