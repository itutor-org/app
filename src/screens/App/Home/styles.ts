import styled from 'styled-components/native';

interface TopBarProps {
  marginTop: number;
}

export const HomeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.dark_blue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const GroupContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

export const Title = styled.Text`
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
  height: 75%;
  background-color: #f1f1f1;
  border-top-right-radius: ${({ theme }) => theme.margins.MD}px;
  border-top-left-radius: ${({ theme }) => theme.margins.MD}px;
  padding: ${({ theme }) => theme.margins.LG}px
    ${({ theme }) => theme.margins.LG}px 0 ${({ theme }) => theme.margins.LG}px;
`;

export const GroupList = styled.FlatList`
  width: 100%;
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
  border: 2px solid #d1d1d1;
`;

export const GroupCardSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 50%;
`;

export const GroupCardRightSection = styled(GroupCardSection)`
  align-items: flex-end;
`;

export const GroupNameText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const GroupButton = styled.TouchableOpacity`
  width: 120px;
  height: 33px;
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

export const GroupSectionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const TopBar = styled.View<TopBarProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-top: ${({ marginTop }) => marginTop}px;
`;

export const TeacherInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const TeacherName = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const TeacherEmail = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.regular};
  color: ${({ theme }) => theme.colors.gray_200};
`;

export const GroupCountText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.regular};
  color: ${({ theme }) => theme.colors.white};
`;
