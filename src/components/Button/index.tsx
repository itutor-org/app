import React from 'react';
import { ButtonContainer, Text } from './styles';

interface ButtonProps {
  onPress: () => void;
  text: string;
}

export function Button({ onPress, text }: ButtonProps) {
  return (
    <>
      <ButtonContainer onPress={onPress}>
        <Text>{text}</Text>
      </ButtonContainer>
    </>
  );
}

export default Button;
