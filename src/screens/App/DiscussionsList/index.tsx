import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  HomeContainer,
  GroupContainer,
  Title,
  GroupsWrapper,
  GroupList
} from './styles';
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
import { TopBar } from '../../../components/TopBar';
import { SearchBar } from '../../../components/SearchBar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateDiscussionSchema } from './schema';
import { InputForm } from '../../../components/Form/InputForm';
import Button from '../../../components/Button';
import { CreateDiscussionData } from '../../../entities/Forms/CreateDiscussion';

type Props = NativeStackScreenProps<AppStackParamList, 'DiscussionsList'>;

export function DiscussionsList({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const { setLoading } = useLoading();
  const [discussions, setDiscussions] = React.useState<Discussion[]>([]);
  const [showCreateDiscussionModal, setShowCreateDiscussionModal] =
    React.useState(false);

  const [searchText, setSearchText] = React.useState('');

  const {
    control,
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CreateDiscussionSchema)
  });

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

  async function handleCreateDiscussion({
    general_subject,
    specific_subject,
    duration
  }: CreateDiscussionData) {
    setLoading(true);
    await createDiscussion(
      route.params.group_id,
      general_subject,
      specific_subject,
      route.params.participants_number,
      duration
    )
      .then((data) => {
        if (data) {
          navigation.push('Discussion', {
            group_id: route.params.group_id,
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    loadDiscussions();
  }, [discussions]);

  return (
    <HomeContainer>
      <TopBar navigation={navigation} />
      <GroupContainer>
        <Title>DISCUSSÕES</Title>

        <SearchBar
          onChangeText={(value) => setSearchText(value)}
          iconAction={() =>
            setShowCreateDiscussionModal(!showCreateDiscussionModal)
          }
        />

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={discussions.filter((discussion) => {
              if (searchText === '') {
                return discussion;
              } else if (
                discussion.specific_subject
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return discussion;
              }
            })}
            keyExtractor={({ id }: Discussion) => id}
            renderItem={({ item }: any) => (
              <DiscussionCard
                id={item.id}
                general_subject={item.general_subject}
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
        showModal={() => {
          reset();
          setShowCreateDiscussionModal(!showCreateDiscussionModal);
        }}
        children={
          <>
            <InputForm
              name="general_subject"
              control={control}
              error={
                errors.general_subject &&
                (errors.general_subject.message as any)
              }
              icon={
                <MaterialIcons
                  name="topic"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 10 }}
                />
              }
              keyboardType="default"
              placeholder="Tópico geral"
              autoCapitalize="sentences"
            />

            <InputForm
              name="specific_subject"
              control={control}
              error={
                errors.specific_subject &&
                (errors.specific_subject.message as any)
              }
              icon={
                <MaterialIcons
                  name="subject"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 10 }}
                />
              }
              keyboardType="default"
              placeholder="Tópico específico"
              autoCapitalize="sentences"
            />

            <InputForm
              name="duration"
              control={control}
              error={errors.duration && (errors.duration.message as any)}
              icon={
                <MaterialIcons
                  name="access-time"
                  size={19}
                  color={'#8D8D99'}
                  style={{ marginRight: 10 }}
                />
              }
              keyboardType="numeric"
              placeholder="Duração em minutos"
              autoCapitalize="sentences"
            />

            <Button
              text="Iniciar discussão"
              onPress={handleSubmit(handleCreateDiscussion)}
            />
          </>
        }
      />
    </HomeContainer>
  );
}
