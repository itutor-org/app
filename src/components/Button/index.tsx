import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonContainer, Text } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
}

export function Button({ onPress, text, ...rest }: ButtonProps) {
  return (
    <>
      <ButtonContainer onPress={onPress} {...rest}>
        <Text>{text}</Text>
      </ButtonContainer>
    </>
  );
}
