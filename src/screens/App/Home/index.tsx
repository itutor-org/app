import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../routes/app.routes';
import { HomeContainer, Title } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  return (
    <HomeContainer>
      <Title>Home!</Title>
    </HomeContainer>
  );
}
