import { ActivityIndicator } from 'react-native';

import { ModalComponent } from '../Modal';

import { theme } from '../../styles/theme';

import { Container } from './styles';

interface LoadingProps {
  visible: boolean;
  showModal: (value: boolean) => void;
}

export function Loading({ visible, showModal }: LoadingProps) {
  return (
    <ModalComponent
      title="Carregando..."
      visible={visible}
      showModal={showModal}
      style={{ zIndex: 999 }}
      children={
        <Container>
          <ActivityIndicator size="large" color={theme.colors.dark_blue} />
        </Container>
      }
      showCloseButton={false}
    />
  );
}
