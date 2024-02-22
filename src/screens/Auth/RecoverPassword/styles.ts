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

export const LogoImage = styled.Image`
  width: 100%;
  height: 23%;
  resizeMode: stretch;
  margin-bottom: ${({ theme }) => theme.margins.XXL}px;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD_LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;
