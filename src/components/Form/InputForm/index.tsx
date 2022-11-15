import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge
} from 'react-hook-form';
import { TextInput } from 'react-native';

import { Input, InputWrapper, Error } from './styles';

interface InputFormProps extends React.ComponentProps<typeof TextInput> {
  icon: React.ReactNode;
  control: Control;
  name: string;
  error?: string;
}

export function InputForm({
  icon,
  control,
  name,
  error,
  ...rest
}: InputFormProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        formState,
        fieldState
      }) => (
        <>
          <InputWrapper>
            {icon}
            <Input
              value={value}
              onBlur={onBlur}
              ref={ref}
              onChangeText={onChange}
              {...rest}
            />
          </InputWrapper>
          {error && <Error>{error}</Error>}
        </>
      )}
    />
  );
}
