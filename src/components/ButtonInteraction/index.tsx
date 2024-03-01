import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonContainerInteraction, Text } from './styles';
import { Foundation } from '@expo/vector-icons';

interface ButtonInteractionProps extends TouchableOpacityProps {
  onPress: () => void;
  name: string;
  size: number;
  color: string;
}

export function ButtonInteraction({ onPress, name, size, color, ...rest }: ButtonInteractionProps) {
  return (
    <>
      <ButtonContainerInteraction onPress={onPress} {...rest}>
         <Foundation name={name} size={size} color={color} />
      </ButtonContainerInteraction>
    </>
  );
}
