import styled, { DefaultTheme } from 'styled-components/native';

interface ButtonProps {
  theme: DefaultTheme;
  isSubmit: boolean;
}

interface CardProps {
  theme: DefaultTheme;
  isSelected: boolean;
}

interface StudentCardProps {
  theme: DefaultTheme;
  color: string;
  isSelected: boolean;
}

interface InteractionCardProps extends CardProps {
  color: string;
}

interface TopBarProps {
  theme: DefaultTheme;
  marginTop: number;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.dark_blue};
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

export const TopBar = styled.View<TopBarProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-top: ${(props) => props.marginTop}px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font_weight.bold};
`;

export const TimeText = styled(Title)`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 500;
`;

export const Middle = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 65%;
`;

export const CardsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 95%;
  flex-wrap: wrap;
`;

export const StudentCard = styled.TouchableOpacity<StudentCardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 5px solid
    ${(props) => (props.isSelected ? props.color : props.theme.colors.white)};
`;

export const StudentCardText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-align: center;
`;

export const InteractionsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: ${({ theme }) => theme.margins.MD}px 0;
  background-color: ${({ theme }) => theme.colors.light_blue};
`;

export const InteractionCard = styled.TouchableOpacity<InteractionCardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: ${(props) => props.color};
  border: 10px solid
    ${(props) => (props.isSelected ? props.theme.colors.white : props.color)};
`;

export const InteractionCardText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font_weight.bold};
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InteractionButtonsWrapper = styled(ButtonsWrapper)`
  flex-direction: row;
  width: 90%;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 90%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${(props) =>
    props.isSubmit
      ? props.theme.colors.medium_green
      : props.theme.colors.dark_yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.margins.SM}px 0;
  border-radius: 6px;
`;

export const InteractionButton = styled(Button)`
  width: 48%;
  background-color: ${(props) =>
    props.isSubmit
      ? props.theme.colors.medium_green
      : props.theme.colors.light_red};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;

export const InteractionButtonText = styled(ButtonText)`
  font-size: ${({ theme }) => theme.font_size.SM}px;
`;
