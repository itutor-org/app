import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

import { TopBar } from '../../../components/TopBar';
import { SearchBar } from '../../../components/SearchBar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateDiscussionSchema } from './schema';
import { InputForm } from '../../../components/Form/InputForm';
import { Button } from '../../../components/Button';
import { CreateDiscussionData } from '../../../entities/Forms/createDiscussion.data';

type Props = NativeStackScreenProps<AppStackParamList, 'DiscussionsList'>;

export function DiscussionsList({ navigation, route }: Props) {
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
    try {
      await deleteDiscussion(discussion_id);
      await DeleteDiscussionResult(discussion_id);

      discussions.splice(
        discussions.findIndex((discussion) => discussion.id === discussion_id),
        1
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateDiscussion({
    general_subject,
    specific_subject,
    duration
  }: CreateDiscussionData) {
    try {
      setShowCreateDiscussionModal(false);
      const discussion = await createDiscussion(
        route.params.group_id,
        general_subject,
        specific_subject,
        route.params.participants_number,
        duration
      );

      navigation.push('Discussion', {
        group_id: route.params.group_id,
        discussion_id: discussion.id,
        duration: discussion.duration,
        general_subject: discussion.general_subject,
        specific_subject: discussion.specific_subject,
        participants_number: discussion.participants_number
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function loadDiscussions() {
    try {
      const discussions = await getDiscussions(route.params.group_id);

      setDiscussions(discussions);
    } catch (error) {
      console.log(error);
    }
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
              maxLength={3}
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
