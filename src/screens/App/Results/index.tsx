import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Button } from '../../../components/Button';
import { AppStackParamList } from '../../../routes/app.routes';
import { theme } from '../../../styles/theme';
import {
  Container,
  Title,
  Subtitle,
  RandomnessTitle,
  RandomnessPercentage,
  LoadingContainer,
  GraphImage
} from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Results'>;

export function Results({ navigation, route }: Props) {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      if (e.data.action.type === 'NAVIGATE') navigation.dispatch(e.data.action);
    });
  }, [navigation]);

  return (
    <Container>
      <Title>Resultado</Title>
      <Subtitle>Seu resultado foi:</Subtitle>
      <LoadingContainer>
        {route.params.discussion_result.graph ? (
          <GraphImage
            resizeMode="stretch"
            source={{
              uri: route.params.discussion_result.graph
            }}
          />
        ) : (
          <ActivityIndicator size="large" color={theme.colors.dark_blue} />
        )}
      </LoadingContainer>
      <RandomnessTitle>Índice de Aleatoriedade</RandomnessTitle>
      <RandomnessPercentage>
        {route.params.discussion_result.random_percent}
      </RandomnessPercentage>

      <Button
        text="Finalizar"
        style={{ width: '90%' }}
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
