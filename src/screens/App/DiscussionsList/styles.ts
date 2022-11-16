import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.dark_blue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
`;

export const GroupContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
`;

export const GroupsWrapper = styled.View`
  width: 100%;
  height: 75%;
  background-color: #f1f1f1;
  border-top-right-radius: ${({ theme }) => theme.margins.MD}px;
  border-top-left-radius: ${({ theme }) => theme.margins.MD}px;
  padding: ${({ theme }) => theme.margins.LG}px
    ${({ theme }) => theme.margins.LG}px 0 ${({ theme }) => theme.margins.LG}px;
`;

export const GroupList = styled.FlatList`
  width: 100%;
  min-width: 100%;
`;
