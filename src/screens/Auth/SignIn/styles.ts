import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  padding: 20px;
`;

export const TopContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 40%;
  width: 100%;
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.dark_yellow};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const WelcomeText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD_LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const RecoverPasswordButton = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: ${({ theme }) => theme.margins.MD}px 0;
`;

export const RecoverPasswordButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.light_orange};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  margin-left: ${({ theme }) => theme.margins.SM}px;
`;

export const SignUpWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.margins.MD}px; ;
`;

export const SignUpText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
`;

export const SignUpLink = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.margins.SSM}px;
`;

export const SignUpLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.light_orange};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
`;
