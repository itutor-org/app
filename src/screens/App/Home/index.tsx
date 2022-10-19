import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
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
  GroupList,
  TopBar,
  TeacherInfo,
  TeacherName,
  TeacherEmail
} from './styles';
import { theme } from '../../../styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteGroup, getGroups, Group } from '../../../services/groupService';
import { HomeCard } from '../../../components/HomeCard';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<Group[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  async function handleDeleteGroup(group_id: string): Promise<void> {
    await deleteGroup(group_id).then(() => {
      setShowConfirmationModal(!showConfirmationModal);
    });
  }

  async function handleSearch(text: string) {
    if (text) {
      const filtered = groups.filter((group) => {
        return group.name.toLowerCase().includes(text.toLowerCase());
      });

      setFilteredGroups(filtered);
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

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    }),
      loadGroups();
  }, [navigation]);

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
              onChangeText={(value) => handleSearch(value)}
              onKeyPress={(e) => {
                if (e.key === 'Backspace') {
                  handleSearch('');
                }
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
              <HomeCard
                id={item.id}
                name={item.name}
                participants_number={item.participants_number}
                class_name={item.class_name}
                deleteAction={() => handleDeleteGroup(item.id)}
                navigation={navigation}
              />
            )}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
