import styled from 'styled-components/native';

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.dark_yellow};
  margin-bottom: ${({ theme }) => theme.margins.XL}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;
