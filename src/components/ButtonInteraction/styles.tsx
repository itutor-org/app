import styled from 'styled-components/native';

export const ButtonContainerInteraction = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.light_orange};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border_radius.round};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;
