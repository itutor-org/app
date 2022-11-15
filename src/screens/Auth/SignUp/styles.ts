import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.dark_yellow};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
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
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;
