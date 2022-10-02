import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  HomeContainer,
  GroupContainer,
  Title,
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
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  getGroupByName,
  getGroups,
  Group
} from '../../../services/groupService';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  function handleDeleteGroup() {
    Alert.alert('Deletar grupo', 'Tem certeza que deseja deletar este grupo?', [
      {
        text: 'NÃO',
        style: 'cancel'
      },
      {
        text: 'SIM',
        onPress: () => {
          console.log('deletar');
        }
      }
    ]);
  }

  async function handleSearch(text: string) {
    if (text) {
      const newData = filteredGroups.filter((item) => {
        return item ? item.name.includes(text) : '';
      });

      setFilteredGroups(newData);
    } else {
      setFilteredGroups(groups);
    }
  }

  async function loadGroups() {
    await getGroups(user.id)
      .then((data) => {
        setGroups(data);
        setFilteredGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <HomeContainer>
      <TopBar marginTop={StatusBar.currentHeight + 15}>
        <TeacherInfo>
          <TeacherName>Prof. {user.name}</TeacherName>
          <TeacherEmail>{user.email}</TeacherEmail>
        </TeacherInfo>
        <MaterialIcons
          name="logout"
          size={30}
          color={theme.colors.white}
          onPress={logoff}
        />
      </TopBar>
      <GroupContainer>
        <Title>GRUPOS</Title>

        <SearchWrapper>
          <SearchInputWrapper>
            <SearchInput
              placeholder="Pesquisar"
              onChangeText={(value: string) => {
                handleSearch(value);
              }}
            />
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
            onPress={() => navigation.navigate('AddGroup')}
          />
        </SearchWrapper>

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={filteredGroups}
            keyExtractor={({ id }: Group) => id}
            renderItem={({ item }) => (
              <GroupCard>
                <GroupCardSection>
                  <GroupNameText>{item.name}</GroupNameText>
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
                      {item.participants_number}
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
                      onPress={handleDeleteGroup}
                    />
                  </GroupSectionWrapper>
                </GroupCardRightSection>
              </GroupCard>
            )}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
