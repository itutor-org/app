import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
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

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;
