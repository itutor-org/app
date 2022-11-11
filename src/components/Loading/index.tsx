import { ActivityIndicator } from 'react-native';

import { ModalComponent } from '../Modal';

import { theme } from '../../styles/theme';

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
      height={150}
      children={
        <ActivityIndicator size="large" color={theme.colors.dark_blue} />
      }
      showCloseButton={false}
    />
  );
}
