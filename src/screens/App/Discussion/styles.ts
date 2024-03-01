import styled, { DefaultTheme } from 'styled-components/native';

import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

interface CardProps {
  theme: DefaultTheme;
  isSelected: boolean;
}

interface StudentCardProps {
  theme: DefaultTheme;
  color: () => string;
  isSelected: boolean;
  source?: string;
}


interface InteractionCardProps extends CardProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 10px;
`;

export const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TopicWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font_weight.bold};
`;

export const TimeText = styled(Title)`
  margin-top: ${({ theme }) => theme.margins.SSM}px;
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 500;
`;

export const CardsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

export const StudentCard = styled.TouchableOpacity<StudentCardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  ${({ theme }) => `
    border-radius: ${theme.border_radius.round}px;
  `}
  overflow: hidden;
  border: 2px solid
    ${(props) => (props.isSelected ? props.color : props.theme.colors.white)};
`;

export const StudentCardText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.margins.SSM}px;
`;


export const InteractionsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
  height: ${screenHeight * 0.54}px;
  padding: ${({ theme }) => theme.margins.MD}px 0;
  margin: ${({ theme }) => theme.margins.MD}px 0;
  background-color: ${({ theme }) => theme.colors.gray_blue};
  border: 4px solid 
    ${({ theme }) => theme.colors.blue_border};
  ${({ theme }) => `
    border-radius: ${theme.border_radius.round}px;
  `}
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const InteractionCard = styled.TouchableOpacity<InteractionCardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 40px;
  margin: ${({ theme }) => theme.margins.SSM}px;
  background-color: ${(props) => props.color};
  border: 2px solid
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
  padding: ${({ theme }) => theme.margins.SSM}px 20px;
`;

export const InteractionButtonsWrapper = styled(ButtonsWrapper)`
  flex-direction: row;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
  padding: ${({ theme }) => theme.margins.SSM}px 0;
`;

export const StudentCardView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const ImageBackgroundStudent = styled.ImageBackground`
  object-fit: cover;
  width: 65px;
  height: 65px;
`;