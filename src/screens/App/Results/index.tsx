import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { Button } from '../../../components/Button';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  Container,
  Title,
  Subtitle,
  Image,
  RandomnessTitle,
  RandomnessPercentage
} from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Results'>;

export function Results({ navigation, route }: Props) {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'NAVIGATE') navigation.dispatch(e.data.action);
      else e.preventDefault();
    });
  }, [navigation]);

  return (
    <Container>
      <Title style={{ marginTop: StatusBar.currentHeight + 10 }}>
        Resultado
      </Title>
      <Subtitle>Seu resultado foi:</Subtitle>
      <Image
        resizeMode="stretch"
        source={{ uri: route.params.discussion_result.graph }}
      />
      <RandomnessTitle>Índice de Aleatoriedade</RandomnessTitle>
      <RandomnessPercentage>
        {route.params.discussion_result.random_percent}
      </RandomnessPercentage>

      <Button
        text="Finalizar"
        onPress={() =>
          navigation.navigate('DiscussionsList', {
            group_id: route.params.group_id,
            participants_number: route.params.participants_number
          })
        }
      />
    </Container>
  );
}
