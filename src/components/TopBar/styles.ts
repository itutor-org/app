import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  
`;

export const ContainerChildren = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

export const TeacherInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ theme }) => theme.margins.SM}px;
`;

export const TeacherName = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const TeacherEmail = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
  color: ${({ theme }) => theme.colors.gray_200};
`;


export const TeacherImage = styled.Image`
  width: 65px;
  height: 65px;
  border:  solid 
  ${({ theme }) => theme.colors.white};
  border-radius: 100px;
`;