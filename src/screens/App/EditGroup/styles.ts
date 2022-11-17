import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.dark_blue};
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const AddStudentArea = styled.View`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.margins.MD}px;
  border-radius: 6px;
  background-color: #f1f1f1;
  margin: 0 0 ${({ theme }) => theme.margins.SM}px;
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
  margin: 5px 0;
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
