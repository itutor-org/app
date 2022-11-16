import React from 'react';
import { TextInput } from 'react-native';
import { Input as InputReact, InputWrapper } from '../Form/InputForm/styles';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  icon: React.ReactNode;
  width?: string;
}

export function Input({ icon, width, ...rest }: InputProps) {
  return (
    <InputWrapper
      style={{
        width
      }}>
      <InputReact {...rest} />
      {icon}
    </InputWrapper>
  );
}
