import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  padding: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 50%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font_weight.bold};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: ${({ theme }) => theme.font_weight.bold};
  margin: ${({ theme }) => theme.margins.SM}px 0
    ${({ theme }) => theme.margins.MD}px;
`;

export const RandomnessTitle = styled(Title)`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  margin: ${({ theme }) => theme.margins.MD}px 0;
`;

export const RandomnessPercentage = styled(Title)`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  background-color: ${({ theme }) => theme.colors.light_blue};
  width: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.margins.SM}px 0;
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;
