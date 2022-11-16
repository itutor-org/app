import React from 'react';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

import {
  Container,
  CardSection,
  CardRightSection,
  CardTitle,
  Button,
  ButtonText,
  SectionWrapper
} from './styles';
import { theme } from '../../styles/theme';
import { Alert, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/app.routes';

interface HomeCardProps {
  id: string;
  name: string;
  participants_number: number;
  class_name: string;
  deleteAction: () => Promise<void>;
  navigation: NativeStackNavigationProp<AppStackParamList, 'Home'>;
}

export function HomeCard({
  id,
  name,
  participants_number,
  class_name,
  deleteAction,
  navigation
}: HomeCardProps) {
  return (
    <>
      <Container>
        <CardSection>
          <CardTitle>{name}</CardTitle>
          <Button
            onPress={() =>
              navigation.navigate('DiscussionsList', {
                group_id: id,
                participants_number
              })
            }>
            <ButtonText>ACESSAR GRUPO</ButtonText>
          </Button>
        </CardSection>
        <CardRightSection>
          <SectionWrapper>
            <FontAwesome5 name="users" size={20} color="#4e4e4e" />
            <Text
              style={{
                fontWeight: '900',
                marginLeft: 10,
                marginRight: 5
              }}>
              {participants_number}
            </Text>
          </SectionWrapper>

          <SectionWrapper>
            <Feather
              name="edit"
              size={25}
              color={theme.colors.gray_200}
              onPress={() => {
                navigation.navigate('EditGroup', {
                  group_id: id,
                  name,
                  class_name
                });
              }}
            />

            <MaterialIcons
              name="delete"
              size={25}
              color={theme.colors.gray_200}
              style={{
                marginLeft: 15
              }}
              onPress={() =>
                Alert.alert(
                  'Excluir grupo',
                  'Tem certeza que deseja excluir este grupo?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel'
                    },
                    {
                      text: 'Excluir',
                      onPress: () => deleteAction()
                    }
                  ]
                )
              }
            />
          </SectionWrapper>
        </CardRightSection>
      </Container>
    </>
  );
}

export default HomeCard;
