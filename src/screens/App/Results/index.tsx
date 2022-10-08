import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';

import { Container } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Results({ navigation, route }: Props) {
  return <Container />;
}
