import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';

import {
  Container,
  Title,
  Subtitle,
  Image,
  RandomnessTitle,
  RandomnessPercentage,
  ClassificationTextWrapper,
  ClassificationText,
  Button,
  ButtonText
} from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Results'>;

export function Results({ navigation, route }: Props) {
  return (
    <Container>
      <Title>Resultado</Title>
      <Subtitle>Seu resultado foi:</Subtitle>
      <Image source={require('../../../../assets/graph.png')} />
      <RandomnessTitle>Índice de Aleatoriedade</RandomnessTitle>
      <RandomnessPercentage>0,84%</RandomnessPercentage>
      <ClassificationTextWrapper>
        <ClassificationText>Classificação</ClassificationText>
        <ClassificationText>0 a 0,4: Ruim</ClassificationText>
        <ClassificationText>0,4 a 0,6: Ideal</ClassificationText>
        <ClassificationText>0,6 a 1,0: Demasiado</ClassificationText>
      </ClassificationTextWrapper>

      <Button
        onPress={() =>
          navigation.replace('DiscussionsList', {
            group_id: route.params.group_id,
            participants_number: route.params.participants_number
          })
        }>
        <ButtonText>Finalizar</ButtonText>
      </Button>
    </Container>
  );
}
