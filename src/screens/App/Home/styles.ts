import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark_blue};
  align-items: center;
  justify-content: flex-end;
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const SearchWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;

export const SearchInputWrapper = styled.View`
  width: 87.5%;
  height: 50px;
  padding: ${({ theme }) => theme.margins.SM}px
    ${({ theme }) => theme.margins.MD}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 6px;
`;

export const SearchInput = styled.TextInput`
  width: 85%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
`;

export const GroupsWrapper = styled.View`
  width: 90%;
  height: 60%;
  background-color: #d8d8d8;
  border-top-right-radius: ${({ theme }) => theme.margins.MD}px;
  border-top-left-radius: ${({ theme }) => theme.margins.MD}px;
  padding-bottom: ${({ theme }) => theme.margins.LG}px;
`;

export const GroupList = styled.FlatList`
  width: 100%;
  padding: ${({ theme }) => theme.margins.LG}px;
`;

export const GroupCard = styled.View`
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
`;

export const GroupCardSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 50%;
  border: 1px solid red;
`;

export const GroupNameText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const GroupButton = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.dark_yellow};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GroupButtonText = styled.Text`
  font-size: 11px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const GroupCardRightSection = styled(GroupCardSection)`
  align-items: flex-end;
`;

export const ActionButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 75%;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid red;
`;
