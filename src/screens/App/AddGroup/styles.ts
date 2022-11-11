import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.dark_blue};
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const InputWrapper = styled.View`
  width: 90%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
  border: 2px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 6px;
`;

export const Input = styled.TextInput`
  width: 87.5%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  padding: ${({ theme }) => theme.margins.SM}px;
  background-color: ${({ theme }) => theme.colors.light_orange};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.margins.SM}px 0;
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  text-transform: uppercase;
`;

export const AddStudentArea = styled.View`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.margins.MD}px;
  border-radius: 6px;
  background-color: #f1f1f1;
`;

export const AddStudentButton = styled(SubmitButton)`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.medium_green};
`;

export const StudentCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: ${({ theme }) => theme.margins.MD}px;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
`;

export const StudentName = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const ActionsButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StudentsList = styled.FlatList`
  width: 100%;
  min-width: 100%;
`;

export const InfoModalText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin: ${({ theme }) => theme.margins.MD}px 0;
`;
