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
import { useEffect, useState } from 'react';
import {
  deleteDiscussion,
  Discussion,
  getDiscussions
} from '../../../services/discussionService';
import DiscussionCard from '../../../components/DiscussionCard';

type Props = NativeStackScreenProps<AppStackParamList, 'DiscussionsList'>;

export function DiscussionsList({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  async function handleDeleteDiscussion(discussionId: string) {
    await deleteDiscussion(discussionId).then(() => {
      setShowConfirmationModal(!showConfirmationModal);
    });
  }

  // async function handleSearch(text: string) {
  //   if (text) {
  //     const newData = filteredGroups.filter((item) => {
  //       return item ? item.name.includes(text) : '';
  //     });

  //     setFilteredGroups(newData);
  //   } else {
  //     setFilteredGroups(groups);
  //   }
  // }

  async function loadDiscussions() {
    await getDiscussions(route.params.groupId)
      .then((data) => {
        setDiscussions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadDiscussions();
  }, [discussions]);

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
        <Title>DISCUSSÕES</Title>

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
            onPress={() => navigation.navigate('AddGroup')}
          />
        </SearchWrapper>

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={discussions}
            keyExtractor={({ id }: Discussion) => id}
            renderItem={({ item }) => (
              <DiscussionCard
                id={item.id}
                randomness_index={item.randomness_index}
                specific_subject={item.specific_subject}
                participantsNumber={item.participants_number}
                deleteAction={() => handleDeleteDiscussion(item.id)}
                navigation={navigation}
              />
            )}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
