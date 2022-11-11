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
  TeacherEmail,
  InputWrapper,
  Input,
  SubmitButton,
  ButtonText
} from './styles';
import { theme } from '../../../styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  deleteDiscussion,
  getDiscussions,
  createDiscussion
} from '../../../services/discussionService';
import DiscussionCard from '../../../components/DiscussionCard';
import ModalComponent from '../../../components/Modal';
import { Discussion } from '../../../entities/discussion.entity';
import { DeleteDiscussionResult } from '../../../services/graphService';
import { useLoading } from '../../../contexts/loading';

type Props = NativeStackScreenProps<AppStackParamList, 'DiscussionsList'>;

export function DiscussionsList({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const { setLoading } = useLoading();
  const [discussions, setDiscussions] = React.useState<Discussion[]>([]);
  const [filteredDiscussions, setFilteredDiscussions] = React.useState<
    Discussion[]
  >([]);
  const [showCreateDiscussionModal, setShowCreateDiscussionModal] =
    React.useState(false);

  const [discussion, setDiscussion] = React.useState<Discussion>(
    {} as Discussion
  );

  async function handleDeleteDiscussion(discussion_id: string) {
    setLoading(true);
    await deleteDiscussion(discussion_id).catch((err) => {
      console.log(err);
    });

    await DeleteDiscussionResult(discussion_id)
      .then(() => {
        discussions.splice(
          discussions.findIndex(
            (discussion) => discussion.id === discussion_id
          ),
          1
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  async function handleCreateDiscussion(group_id: string) {
    await createDiscussion(
      group_id,
      discussion.general_subject,
      discussion.specific_subject,
      route.params.participants_number,
      discussion.duration
    )
      .then((data) => {
        if (data) {
          navigation.navigate('Discussion', {
            group_id: group_id,
            discussion_id: data.id,
            duration: data.duration,
            general_subject: data.general_subject,
            specific_subject: data.specific_subject,
            participants_number: data.participants_number
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadDiscussions() {
    await getDiscussions(route.params.group_id)
      .then((data) => {
        setDiscussions(data);
        setFilteredDiscussions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSearch(text: string) {
    if (text) {
      const filtered = discussions.filter((discussion) => {
        return discussion.specific_subject
          .toLowerCase()
          .includes(text.toLowerCase());
      });

      setFilteredDiscussions(filtered);
    } else {
      setFilteredDiscussions(discussions);
    }
  }

  React.useEffect(() => {
    loadDiscussions();
  }, [discussions]);

  return (
    <HomeContainer>
      <TopBar marginTop={StatusBar.currentHeight + 15}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={theme.colors.dark_yellow}
          onPress={() => navigation.popToTop()}
        />
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
            onPress={() =>
              setShowCreateDiscussionModal(!showCreateDiscussionModal)
            }
          />
        </SearchWrapper>

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={filteredDiscussions}
            keyExtractor={({ id }: Discussion) => id}
            renderItem={({ item }) => (
              <DiscussionCard
                id={item.id}
                randomness_index={item.randomness_index}
                specific_subject={item.specific_subject}
                participantsNumber={item.participants_number}
                deleteAction={() => handleDeleteDiscussion(item.id)}
                navigation={navigation}
                graph={item.graph}
              />
            )}
          />
        </GroupsWrapper>
      </GroupContainer>

      <ModalComponent
        title="Criar discussão"
        showCloseButton={true}
        visible={showCreateDiscussionModal}
        showModal={setShowCreateDiscussionModal}
        height={350}
        children={
          <>
            <InputWrapper>
              <MaterialIcons
                name="topic"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Tópico geral"
                onChangeText={(value: string) =>
                  setDiscussion({ ...discussion, general_subject: value })
                }
              />
            </InputWrapper>
            <InputWrapper>
              <MaterialIcons
                name="subject"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Sub-tópico"
                onChangeText={(value: string) =>
                  setDiscussion({ ...discussion, specific_subject: value })
                }
              />
            </InputWrapper>
            <InputWrapper>
              <MaterialIcons
                name="access-time"
                size={19}
                color={'#8D8D99'}
                style={{ marginRight: 7 }}
              />
              <Input
                placeholder="Duração em minutos"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={(value: number) =>
                  setDiscussion({ ...discussion, duration: value })
                }
              />
            </InputWrapper>
            <SubmitButton
              onPress={() => handleCreateDiscussion(route.params.group_id)}>
              <ButtonText>Iniciar Discussão</ButtonText>
            </SubmitButton>
          </>
        }
      />
    </HomeContainer>
  );
}
