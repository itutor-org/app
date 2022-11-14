import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  Container,
  TopBar,
  Wrapper,
  Title,
  TimeText,
  Subtitle,
  Middle,
  CardsWrapper,
  StudentCard,
  StudentCardText,
  InteractionsWrapper,
  InteractionCard,
  InteractionCardText,
  ButtonsWrapper,
  Button,
  ButtonText,
  InteractionButtonsWrapper,
  InteractionButton,
  InteractionButtonText
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { deleteDiscussion } from '../../../services/discussionService';
import {
  createInteraction,
  deleteInteractionsByDiscussion,
  getInteractionByDiscussion
} from '../../../services/interactionService';
import { ScreenStudent } from '../../../entities/student.entity';
import {
  Action,
  Interaction,
  InteractionResponse
} from '../../../entities/interaction.entity';
import { createDiscussionResult } from '../../../services/graphService';
import { DiscussionResult } from '../../../entities/discussion.entity';
import { useLoading } from '../../../contexts/loading';
import { getStudentsByGroup } from '../../../services/studentService';
import InformationModal from '../../../components/InformationModal';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Discussion({ navigation, route }: Props) {
  const [students, setStudents] = React.useState<ScreenStudent[]>([]);
  const [actions, setActions] = React.useState<Action[]>([
    {
      name: 'Concordou',
      tag: 'C',
      color: theme.colors.light_red,
      isSelected: false
    },
    {
      name: 'Discordou',
      tag: 'D',
      color: theme.colors.dark_yellow,
      isSelected: false
    },
    {
      name: 'Iniciou',
      tag: 'I',
      color: theme.colors.dark_green,
      isSelected: false
    },
    {
      name: 'Respondeu',
      tag: 'R',
      color: theme.colors.gray_200,
      isSelected: false
    }
  ]);

  const [interaction, setInteraction] = React.useState<Interaction>({
    discussion_id: route.params.discussion_id,
    starter: null,
    type: null,
    finisher: null
  });

  const { setLoading } = useLoading();

  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] =
    React.useState(false);
  const [showFinishModal, setShowFinishModal] = React.useState(false);
  const [countdown, setCountdown] = React.useState('');

  function timer(duration: number) {
    let timer = duration,
      minutes: string | number,
      seconds: string | number;
    const interval = setInterval(function () {
      minutes = parseInt(String(timer / 60), 10);
      seconds = parseInt(String(timer % 60), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setCountdown(`${minutes}:${seconds}`);

      if (--timer < 0) {
        timer = 0;
        clearInterval(interval);
        setShowFinishModal(true);
      }
    }, 1000);
  }

  function handleSelectStudent(
    student: ScreenStudent,
    array: ScreenStudent[],
    setArray: (value: ScreenStudent[]) => void
  ) {
    const selectedStudents = array.filter((student) => student.isSelected);

    if (selectedStudents.length === 2) {
      const newArray = array.map((item) => {
        if (item.id === student.id) {
          item.isSelected = false;
        }
        return item;
      });

      if (interaction.starter.id === student.id) {
        setInteraction({
          ...interaction,
          starter: null
        });
      } else if (interaction.finisher.id === student.id) {
        setInteraction({
          ...interaction,
          finisher: null
        });
      }

      setArray(newArray);
    } else {
      const newArray = array.map((item) => {
        if (item.id === student.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      if (interaction.starter) {
        setInteraction({
          ...interaction,
          finisher: {
            id: student.id,
            name: student.name,
            registration: student.registration,
            email: student.email,
            group_id: student.group_id
          }
        });
      } else {
        setInteraction({
          ...interaction,
          starter: {
            id: student.id,
            name: student.name,
            registration: student.registration,
            email: student.email,
            group_id: student.group_id
          }
        });
      }

      setArray(newArray);
    }
  }

  function handleResetInteraction() {
    setActions(
      actions.map((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
        return item;
      })
    );
    setStudents(
      students.map((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
        return item;
      })
    );
    setInteraction({
      discussion_id: route.params.discussion_id,
      starter: null,
      type: null,
      finisher: null
    });
  }

  function handleStoreAction(name: string) {
    setActions(
      actions.map((item) => {
        if (item.name === name) {
          item.isSelected = !item.isSelected;
          setInteraction({
            ...interaction,
            type: item.name
          });
        } else {
          item.isSelected = false;
        }
        return item;
      })
    );
  }

  async function handleStoreInteraction() {
    if (interaction.starter && interaction.finisher && interaction.type) {
      await createInteraction(
        interaction.discussion_id,
        interaction.starter,
        interaction.type,
        interaction.finisher
      ).then(() => {
        handleResetInteraction();
      });
    } else if (
      interaction.starter &&
      !interaction.finisher &&
      interaction.type
    ) {
      await createInteraction(
        interaction.discussion_id,
        interaction.starter,
        interaction.type,
        null
      ).then(() => {
        handleResetInteraction();
      });
    } else {
      return;
    }
  }

  function handleFinalize(discussion_result: DiscussionResult) {
    navigation.replace('Results', {
      discussion_id: route.params.discussion_id,
      group_id: route.params.group_id,
      participants_number: route.params.participants_number,
      discussion_result
    });
  }

  async function handleUnsavedChanges() {
    await deleteInteractionsByDiscussion(route.params.discussion_id)
      .then(async () => {
        await deleteDiscussion(route.params.discussion_id)
          .then(() => {
            navigation.popToTop();
            setShowUnsavedChangesModal(!showUnsavedChangesModal);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleColor(student_id: string): string {
    if (interaction.starter || interaction.finisher) {
      if (interaction.starter?.id === student_id) {
        return theme.colors.orange;
      } else if (interaction.finisher?.id === student_id) {
        return theme.colors.purple;
      }
    } else {
      return theme.colors.white;
    }
  }

  async function handleCreateDiscussionResult() {
    setLoading(true);
    await getInteractionByDiscussion(route.params.discussion_id)
      .then(async (response: InteractionResponse[]) => {
        await createDiscussionResult(response)
          .then((response: DiscussionResult) => {
            handleFinalize(response);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleLoadStudents() {
    setLoading(true);
    await getStudentsByGroup(route.params.group_id)
      .then((response) => {
        const students = response.map((student) => ({
          id: student.id,
          name: student.name,
          registration: student.registration,
          email: student.email,
          group_id: student.group_id,
          isSelected: false
        }));

        setStudents(students);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        timer(60 * route.params.duration);
      });
  }

  React.useEffect(() => {
    handleLoadStudents();
  }, []);

  return (
    <Container>
      <TopBar marginTop={StatusBar.currentHeight + 15}>
        <Wrapper>
          <MaterialIcons
            name="watch-later"
            size={30}
            color={theme.colors.white}
          />
          <TimeText>Tempo</TimeText>
          <Subtitle>{countdown} min</Subtitle>
        </Wrapper>
        <Wrapper
          style={{
            marginRight: 20
          }}>
          <Title>{route.params.general_subject}</Title>
          <Subtitle>{route.params.specific_subject}</Subtitle>
        </Wrapper>
        <AntDesign
          name="closecircleo"
          size={30}
          color={theme.colors.white}
          onPress={() => {
            setShowUnsavedChangesModal(!showUnsavedChangesModal);
          }}
        />
      </TopBar>
      <Middle>
        <CardsWrapper>
          {students.map((student) => (
            <StudentCard
              key={student.name}
              isSelected={student.isSelected}
              color={() => handleColor(student.id)}
              onPress={() =>
                handleSelectStudent(student, students, setStudents)
              }>
              <StudentCardText>{student.name}</StudentCardText>
            </StudentCard>
          ))}
        </CardsWrapper>
        <InteractionsWrapper>
          {actions.map((interaction) => (
            <InteractionCard
              key={interaction.name}
              color={interaction.color}
              isSelected={interaction.isSelected}
              onPress={() => {
                handleStoreAction(interaction.name);
              }}>
              <InteractionCardText>{interaction.tag}</InteractionCardText>
            </InteractionCard>
          ))}
        </InteractionsWrapper>
      </Middle>
      <ButtonsWrapper>
        <InteractionButtonsWrapper>
          <InteractionButton isSubmit={true} onPress={handleStoreInteraction}>
            <InteractionButtonText>GUARDAR INTERAÇÃO</InteractionButtonText>
          </InteractionButton>
          <InteractionButton isSubmit={false} onPress={handleResetInteraction}>
            <InteractionButtonText>DESCARTAR</InteractionButtonText>
          </InteractionButton>
        </InteractionButtonsWrapper>

        <Button
          isSubmit={false}
          onPress={() => setShowConfirmationModal(!showConfirmationModal)}>
          <ButtonText>FINALIZAR DISCUSSÃO</ButtonText>
        </Button>
      </ButtonsWrapper>

      <ConfirmationModal
        message={'Deseja mesmo finalizar essa discussão?'}
        showModal={setShowConfirmationModal}
        visible={showConfirmationModal}
        handleAction={handleCreateDiscussionResult}
      />

      <ConfirmationModal
        message={
          'Deseja finalizar esta discussão? Você perderá todos os dados gerados nessa sessão'
        }
        showModal={setShowUnsavedChangesModal}
        visible={showUnsavedChangesModal}
        handleAction={handleUnsavedChanges}
      />

      <InformationModal
        message={'Sua discussão foi finalizada porquê o tempo acabou!'}
        showModal={setShowFinishModal}
        handleAction={handleCreateDiscussionResult}
        visible={showFinishModal}
        title={'Tempo esgotado!'}
      />
    </Container>
  );
}
