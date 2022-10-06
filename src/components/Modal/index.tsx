import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal } from 'react-native';

import { ModalContainer, ModalContent, ModalTitle } from './styles';

interface ModalComponentProps {
  title: string;
  visible: boolean;
  showModal: (value: boolean) => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export function ModalComponent({
  title,
  visible,
  showModal,
  children,
  showCloseButton
}: ModalComponentProps) {
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
          {showCloseButton && (
            <MaterialIcons
              name="close"
              size={30}
              color={'#8D8D99'}
              style={{
                position: 'absolute',
                right: 10,
                top: 10
              }}
              onPress={() => showModal(!visible)}
            />
          )}
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}

export default ModalComponent;
