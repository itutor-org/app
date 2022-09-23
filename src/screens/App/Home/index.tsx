import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import { HomeContainer, Title } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff } = useAuth();

  return (
    <HomeContainer>
      <Title>Home!</Title>

      <TouchableOpacity onPress={logoff}>
        <Text> Sign Out</Text>
      </TouchableOpacity>
    </HomeContainer>
  );
}
