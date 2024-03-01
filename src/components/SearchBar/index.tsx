import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../styles/theme';
import { Input } from '../Input';
import { SearchWrapper } from './styles';

interface SearchBarProps {
  onChangeText: (text: string) => void;
}

export function SearchBar({ onChangeText}: SearchBarProps) {
  return (
    <SearchWrapper>
      <Input
        icon={
          <MaterialIcons
            name="search"
            size={30}
            color={theme.colors.gray_200}
            style={{ marginLeft: 5 }}
          />
        }
        width={'100%'}
        placeholder="Pesquisar"
        onChangeText={(value) => onChangeText(value)}
      />
    </SearchWrapper>
  );
}
