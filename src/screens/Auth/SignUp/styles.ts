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
  height: 50%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const LogoImage = styled.Image`
  width: 100%;
  height: 43%;
  resizeMode: stretch;
  margin-bottom: ${({ theme }) => theme.margins.XL}px;
  margin-top: ${({ theme }) => theme.margins.XXLG}px;
`

export const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD_LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.LG}px;
`;
