import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const Image = styled.Image`
  width: 90%;
  height: 30%;
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
    ${({ theme }) => theme.margins.LG}px;
`;

export const RandomnessTitle = styled(Title)`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  margin: ${({ theme }) => theme.margins.XL}px 0
    ${({ theme }) => theme.margins.MD}px;
`;

export const RandomnessPercentage = styled(Title)`
  font-size: ${({ theme }) => theme.font_size.XXL}px;
  background-color: ${({ theme }) => theme.colors.light_blue};
  width: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.margins.SM}px 0;
`;

export const ClassificationTextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: ${({ theme }) => theme.margins.LG}px 0;
`;

export const ClassificationText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 55px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.dark_yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.margins.SM}px 0;
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;
