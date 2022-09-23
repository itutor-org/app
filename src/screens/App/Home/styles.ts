import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.red_900};
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  font-size: 16px;
`;
