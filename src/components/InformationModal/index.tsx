import React from 'react';
import { Modal } from 'react-native';

import {
  ModalContainer,
  ModalContent,
  Message,
  ButtonsWrapper,
  ConfirmButton,
  ButtonText,
  Title
} from './styles';

interface InformationModalProps {
  message: string;
  visible: boolean;
  showModal: (value: boolean) => void;
  handleAction: () => void;
  title?: string;
}

export function InformationModal({
  message,
  visible,
  showModal,
  handleAction,
  title
}: InformationModalProps) {
  return (
    <Modal
      animationType="fade"
      hardwareAccelerated
      presentationStyle="overFullScreen"
      onOrientationChange={() => showModal(!visible)}
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        showModal(!visible);
      }}>
      <ModalContainer>
        <ModalContent>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonsWrapper>
            <ConfirmButton
              onPress={() => {
                handleAction();
                showModal(!visible);
              }}>
              <ButtonText>OK</ButtonText>
            </ConfirmButton>
          </ButtonsWrapper>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}

export default InformationModal;
