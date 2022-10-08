import React from 'react';
import ConfirmationModal from '../ConfirmationModal';
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
  RandomnessIndexText
} from './styles';
import { theme } from '../../styles/theme';
import { Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/app.routes';
import ModalComponent from '../Modal';

interface DiscussionCardProps {
  id: string;
  specific_subject: string;
  participantsNumber: number;
  randomness_index: number;
  deleteAction: () => Promise<void>;
  navigation: NativeStackNavigationProp<AppStackParamList, 'DiscussionsList'>;
}

export function DiscussionCard({
  id,
  specific_subject,
  participantsNumber,
  randomness_index,
  deleteAction,
  navigation
}: DiscussionCardProps) {
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

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
              onPress={() => setShowConfirmationModal(!showConfirmationModal)}
            />

            <ConfirmationModal
              message="Deseja mesmo excluir essa discussão?"
              showModal={setShowConfirmationModal}
              visible={showConfirmationModal}
              handleAction={deleteAction}
            />

            <ModalComponent
              title={specific_subject}
              showCloseButton={true}
              visible={showInfoModal}
              showModal={setShowInfoModal}
              children={
                <>
                  <GraphImage source={require('../../../assets/graph.png')} />
                  <MiddleText>Índice de Aleatoriedade</MiddleText>
                  <ClassificationWrapper>
                    <ClassificationTextWrapper>
                      <ClassificationText>Classificação</ClassificationText>
                      <ClassificationText>0 a 0,4: Ruim</ClassificationText>
                      <ClassificationText>0,4 a 0,6: Ideal</ClassificationText>
                      <ClassificationText>
                        0,6 a 1,0: Demasiado
                      </ClassificationText>
                    </ClassificationTextWrapper>
                    <RandomnessIndexWrapper>
                      <RandomnessIndexText>
                        {randomness_index}%
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
