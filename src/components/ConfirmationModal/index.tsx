import React from 'react';
import { Modal } from 'react-native';

import {
  ModalContainer,
  ModalContent,
  Message,
  ButtonsWrapper,
  ConfirmButton,
  DenyButton,
  ButtonText
} from './styles';

interface ConfirmationModalProps {
  message: string;
  visible: boolean;
  showModal: (value: boolean) => void;
  handleAction: () => void;
}

export function ConfirmationModal({
  message,
  visible,
  showModal,
  handleAction
}: ConfirmationModalProps) {
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
          <Message>{message}</Message>
          <ButtonsWrapper>
            <ConfirmButton onPress={handleAction}>
              <ButtonText>SIM</ButtonText>
            </ConfirmButton>
            <DenyButton onPress={() => showModal(!visible)}>
              <ButtonText>NÃO</ButtonText>
            </DenyButton>
          </ButtonsWrapper>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}

export default ConfirmationModal;
