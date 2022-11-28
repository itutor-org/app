import React from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  CardSection,
  CardRightSection,
  CardTitle,
  Button,
  ButtonText,
  SectionWrapper,
  GraphImage,
  MiddleText,
  ClassificationWrapper,
  ClassificationTextWrapper,
  ClassificationText,
  RandomnessIndexWrapper,
  RandomnessIndexText,
  LoadingContainer
} from './styles';
import { theme } from '../../styles/theme';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/app.routes';
import ModalComponent from '../Modal';

interface DiscussionCardProps {
  id: string;
  general_subject: string;
  specific_subject: string;
  graph: string;
  participantsNumber: number;
  randomness_index: number;
  deleteAction: () => Promise<void>;
  navigation: NativeStackNavigationProp<AppStackParamList, 'DiscussionsList'>;
}

export function DiscussionCard({
  id,
  general_subject,
  specific_subject,
  participantsNumber,
  randomness_index,
  deleteAction,
  graph,
  navigation
}: DiscussionCardProps) {
  const [showInfoModal, setShowInfoModal] = React.useState(false);

  return (
    <>
      <Container>
        <CardSection>
          <CardTitle>{specific_subject}</CardTitle>
          <Button onPress={() => setShowInfoModal(!showInfoModal)}>
            <ButtonText>VER INFORMAÇÕES</ButtonText>
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
              {participantsNumber}
            </Text>
          </SectionWrapper>

          <SectionWrapper>
            <MaterialIcons
              name="delete"
              size={25}
              color={theme.colors.gray_200}
              style={{
                marginLeft: 15
              }}
              onPress={() =>
                Alert.alert(
                  'Excluir Discussão',
                  'Tem certeza que deseja excluir esta discussão?',
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

            <ModalComponent
              title={general_subject}
              showCloseButton={true}
              visible={showInfoModal}
              showModal={setShowInfoModal}
              children={
                <>
                  <CardTitle>{specific_subject}</CardTitle>

                  <LoadingContainer>
                    {graph ? (
                      <GraphImage
                        resizeMode="cover"
                        source={{
                          uri: graph
                        }}
                      />
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color={theme.colors.dark_blue}
                      />
                    )}
                  </LoadingContainer>

                  <MiddleText>Índice de Aleatoriedade</MiddleText>
                  <ClassificationWrapper>
                    <ClassificationTextWrapper>
                      <ClassificationText>Classificação</ClassificationText>
                      <ClassificationText>
                        0%: Sem Aleatoriedade
                      </ClassificationText>
                      <ClassificationText>
                        100%: Totalmente Aleatório
                      </ClassificationText>
                    </ClassificationTextWrapper>
                    <RandomnessIndexWrapper>
                      <RandomnessIndexText>
                        {randomness_index}
                      </RandomnessIndexText>
                    </RandomnessIndexWrapper>
                  </ClassificationWrapper>
                </>
              }
            />
          </SectionWrapper>
        </CardRightSection>
      </Container>
    </>
  );
}

export default DiscussionCard;
