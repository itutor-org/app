import React from 'react';
import ConfirmationModal from '../ConfirmationModal';
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
import { Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/app.routes';

interface HomeCardProps {
  id: string;
  name: string;
  participantsNumber: number;
  className: string;
  deleteAction: () => Promise<void>;
  navigation: NativeStackNavigationProp<AppStackParamList, 'Home'>;
}

export function HomeCard({
  id,
  name,

  participantsNumber,
  className,
  deleteAction,
  navigation
}: HomeCardProps) {
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  return (
    <>
      <Container>
        <CardSection>
          <CardTitle>{name}</CardTitle>
          <Button
            onPress={() =>
              navigation.navigate('DiscussionsList', {
                groupId: id
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
              {participantsNumber}
            </Text>
          </SectionWrapper>

          <SectionWrapper>
            <Feather
              name="edit"
              size={25}
              color={theme.colors.gray_200}
              onPress={() => {
                navigation.navigate('EditGroup', {
                  groupId: id,
                  name,
                  participantsNumber,
                  className
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
              onPress={() => setShowConfirmationModal(!showConfirmationModal)}
            />

            <ConfirmationModal
              message="Deseja mesmo excluir esse grupo?"
              showModal={setShowConfirmationModal}
              visible={showConfirmationModal}
              handleAction={deleteAction}
            />
          </SectionWrapper>
        </CardRightSection>
      </Container>
    </>
  );
}

export default HomeCard;
