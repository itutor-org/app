import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 20px 0;
  background-color: ${({ theme }) => theme.colors.dark_blue};
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
  align-items: center;
  justify-content: center;
  background-color: #050A26;
  border-top-right-radius: ${({ theme }) => theme.margins.MD}px;
  border-top-left-radius: ${({ theme }) => theme.margins.MD}px;
  padding: ${({ theme }) => theme.margins.MD}px
    ${({ theme }) => theme.margins.MD}px 0 ${({ theme }) => theme.margins.MD}px;
`;

export const GroupList = styled.FlatList`
  width: 100%;
  min-width: 100%;
`;
