import styled from 'styled-components/native';

export const Card = styled.View`
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
