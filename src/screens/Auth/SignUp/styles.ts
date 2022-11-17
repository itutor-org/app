import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  padding: 20px;
`;

export const Top = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 35%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.dark_yellow};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD_LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
`;
