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
import { deleteGroup, getGroups } from '../../../services/groupService';
import { HomeCard } from '../../../components/HomeCard';
import { Group } from '../../../entities/group.entity';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<Group[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  async function handleDeleteGroup(group_id: string): Promise<void> {
    await deleteGroup(group_id)
      .then(() => {
        setShowConfirmationModal(!showConfirmationModal);
        groups.splice(
          groups.findIndex((group) => group.id === group_id),
          1
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
    loadGroups();
  }, [groups]);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
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
              onChangeText={(value) => setSearchText(value)}
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
            data={filteredGroups.filter((group) => {
              if (searchText === '') {
                return group;
              } else if (
                group.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return group;
              }
            })}
            keyExtractor={({ id }: Group) => id}
            renderItem={({ item }: any) => (
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
