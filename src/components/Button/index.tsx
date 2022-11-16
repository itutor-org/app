import React from 'react';
import { ButtonContainer, Text } from './styles';

interface ButtonProps {
  onPress: () => void;
  text: string;
  color?: string;
}

export function Button({ onPress, text, color }: ButtonProps) {
  return (
    <>
      <ButtonContainer
        {...(color && { style: { backgroundColor: color } })}
        onPress={onPress}>
        <Text>{text}</Text>
      </ButtonContainer>
    </>
  );
}

export default Button;
