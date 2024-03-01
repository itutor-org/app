import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.margins.LG}px;
  padding: ${({ theme }) => theme.margins.MD}px;
  border: 2px solid #d1d1d1;
`;

export const CardSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 50%;
`;

export const CardRightSection = styled(CardSection)`
  align-items: flex-end;
`;

export const CardTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  width: 120px;
  height: 33px;
  background-color: ${({ theme }) => theme.colors.light_orange};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const SectionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const CountText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
  color: ${({ theme }) => theme.colors.white};
`;
