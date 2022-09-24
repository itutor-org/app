import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  HomeContainer,
  GroupContainer,
  ActionText,
  SearchInputWrapper,
  SearchInput,
  SearchWrapper,
  GroupsWrapper,
  GroupCard,
  GroupList,
  GroupCardSection,
  GroupNameText,
  GroupButton,
  GroupButtonText,
  GroupCardRightSection,
  GroupSectionWrapper,
  TopBar,
  TeacherInfo,
  TeacherName,
  TeacherEmail
} from './styles';
import { theme } from '../../../styles/theme';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useState } from 'react';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff } = useAuth();
  const [totalUsers, setTotalUsers] = useState<number>(15);

  const groups = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    }
  ];

  return (
    <HomeContainer>
      <TopBar marginTop={StatusBar.currentHeight + 15}>
        <TeacherInfo>
          <TeacherName>Prof. Lucas</TeacherName>
          <TeacherEmail>lucas@mail.com</TeacherEmail>
        </TeacherInfo>
        <MaterialIcons
          name="logout"
          size={30}
          color={theme.colors.white}
          onPress={logoff}
        />
      </TopBar>
      <GroupContainer>
        <ActionText>GRUPOS</ActionText>

        <SearchWrapper>
          <SearchInputWrapper>
            <SearchInput placeholder="Pesquisar" />
            <MaterialIcons
              name="search"
              size={30}
              color={theme.colors.gray_200}
              style={{ marginLeft: 5 }}
            />
          </SearchInputWrapper>

          <MaterialIcons
            name="add-circle-outline"
            size={30}
            color={theme.colors.white}
          />
        </SearchWrapper>

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={groups}
            renderItem={() => (
              <GroupCard>
                <GroupCardSection>
                  <GroupNameText>MED TARDE 2022</GroupNameText>
                  <GroupButton>
                    <GroupButtonText>ACESSAR GRUPO</GroupButtonText>
                  </GroupButton>
                </GroupCardSection>
                <GroupCardRightSection>
                  <GroupSectionWrapper>
                    <FontAwesome5 name="users" size={20} color="#4e4e4e" />
                    <Text
                      style={{
                        fontWeight: '900',
                        marginLeft: 10,
                        marginRight: 5
                      }}>
                      {totalUsers}
                    </Text>
                  </GroupSectionWrapper>

                  <GroupSectionWrapper>
                    <Feather
                      name="edit"
                      size={25}
                      color={theme.colors.gray_200}
                    />

                    <MaterialIcons
                      name="delete"
                      size={25}
                      color={theme.colors.gray_200}
                      style={{
                        marginLeft: 15
                      }}
                    />
                  </GroupSectionWrapper>
                </GroupCardRightSection>
              </GroupCard>
            )}
            keyExtractor={(item) => item.id}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
