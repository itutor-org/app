import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useLoading } from '../../../contexts/loading';
import { AppStackParamList } from '../../../routes/app.routes';
import { updateDiscussion } from '../../../services/discussionService';

import {
  Container,
  Title,
  Subtitle,
  Image,
  RandomnessTitle,
  RandomnessPercentage,
  Button,
  ButtonText
} from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Results'>;

export function Results({ navigation, route }: Props) {
  const { setLoading } = useLoading();
  async function handleUpdateDiscussion() {
    setLoading(true);
    await updateDiscussion(
      route.params.discussion_id,
      'good',
      route.params.discussion_result.graph,
      route.params.discussion_result.random_percent
    ).finally(() => {
      setLoading(false);
      navigation.replace('DiscussionsList', {
        group_id: route.params.group_id,
        participants_number: route.params.participants_number
      });
    });
  }

  return (
    <Container>
      <Title>Resultado</Title>
      <Subtitle>Seu resultado foi:</Subtitle>
      <Image
        resizeMode="cover"
        source={{ uri: route.params.discussion_result.graph }}
      />
      <RandomnessTitle>Índice de Aleatoriedade</RandomnessTitle>
      <RandomnessPercentage>
        {route.params.discussion_result.random_percent}
      </RandomnessPercentage>

      <Button onPress={handleUpdateDiscussion}>
        <ButtonText>Finalizar</ButtonText>
      </Button>
    </Container>
  );
}
