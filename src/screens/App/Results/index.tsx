import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { Button } from '../../../components/Button';
import { useLoading } from '../../../contexts/loading';
import { AppStackParamList } from '../../../routes/app.routes';
import { updateDiscussion } from '../../../services/discussionService';

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

      <Button text="Finalizar" onPress={handleUpdateDiscussion} />
    </Container>
  );
}
