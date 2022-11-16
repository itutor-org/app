import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ModalProps } from 'react-native';

import { ModalContainer, ModalContent, ModalTitle, CloseDiv } from './styles';

interface ModalComponentProps extends ModalProps {
  title?: string;
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
                right: 20,
                top: 17,
                zIndex: 1
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
