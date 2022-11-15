import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.margins.SSM}px;
  border: 2px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 6px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.light_red};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  line-height: ${({ theme }) => theme.font_size.SM}px;
  margin: 3px;
`;
