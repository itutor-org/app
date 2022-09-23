import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.dark_yellow};
  margin-bottom: ${({ theme }) => theme.margins.XL}px;
`;

export const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const InputWrapper = styled.View`
  width: 80%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
  border: 2px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 6px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.light_orange};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.margins.SM}px 0;
  border-radius: 6px;
`;

export const SubmitButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  text-transform: uppercase;
`;
