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
import { Alert, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteDiscussion } from '../../../services/discussionService';
import {
  createInteraction,
  deleteInteractionsByDiscussion,
  getInteractionByDiscussion
} from '../../../services/interactionService';
import { ScreenStudent } from '../../../entities/student.entity';
import { Action, Interaction } from '../../../entities/interaction.entity';
import { createDiscussionResult } from '../../../services/graphService';
import { useLoading } from '../../../contexts/loading';
import { getStudentsByGroup } from '../../../services/studentService';
import { actionsList } from './actions';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Discussion({ navigation, route }: Props) {
  const [students, setStudents] = React.useState<ScreenStudent[]>([]);
  const [actions, setActions] = React.useState<Action[]>(actionsList);

  const [currentInteraction, setCurrentInteraction] =
    React.useState<Interaction>({
      discussion_id: route.params.discussion_id,
      starter: null,
      type: null,
      finisher: null
    });

  const { setLoading } = useLoading();
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
        Alert.alert('Tempo esgotado!', 'A discussão foi encerrada.', [
          {
            text: 'OK',
            onPress: handleCreateDiscussionResult
          }
        ]);
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

      if (currentInteraction.starter.id === student.id) {
        setCurrentInteraction({
          ...currentInteraction,
          starter: null
        });
      } else if (currentInteraction.finisher.id === student.id) {
        setCurrentInteraction({
          ...currentInteraction,
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

      if (currentInteraction.starter) {
        setCurrentInteraction({
          ...currentInteraction,
          finisher: {
            id: student.id,
            name: student.name,
            registration: student.registration,
            email: student.email,
            group_id: student.group_id
          }
        });
      } else {
        setCurrentInteraction({
          ...currentInteraction,
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
    setCurrentInteraction({
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
          setCurrentInteraction({
            ...currentInteraction,
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
    if (
      currentInteraction.starter &&
      currentInteraction.finisher &&
      currentInteraction.type
    ) {
      await createInteraction(
        currentInteraction.discussion_id,
        currentInteraction.starter,
        currentInteraction.type,
        currentInteraction.finisher
      ).then(() => {
        handleResetInteraction();
      });
    } else if (
      currentInteraction.starter &&
      !currentInteraction.finisher &&
      currentInteraction.type
    ) {
      await createInteraction(
        currentInteraction.discussion_id,
        currentInteraction.starter,
        currentInteraction.type,
        null
      ).then(() => {
        handleResetInteraction();
      });
    } else {
      return;
    }
  }

  async function handleUnsavedChanges() {
    await deleteInteractionsByDiscussion(route.params.discussion_id)
      .then(async () => {
        await deleteDiscussion(route.params.discussion_id)
          .then(() => {
            navigation.popToTop();
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
    if (currentInteraction.starter || currentInteraction.finisher) {
      if (currentInteraction.starter?.id === student_id) {
        return theme.colors.orange;
      } else if (currentInteraction.finisher?.id === student_id) {
        return theme.colors.purple;
      }
    } else {
      return theme.colors.white;
    }
  }

  async function handleCreateDiscussionResult() {
    setLoading(true);
    await getInteractionByDiscussion(route.params.discussion_id)
      .then(async (response) => {
        await createDiscussionResult(response)
          .then((discussion_result) => {
            navigation.replace('Results', {
              discussion_id: route.params.discussion_id,
              group_id: route.params.group_id,
              participants_number: route.params.participants_number,
              discussion_result
            });
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
        timer(60 * route.params.duration);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    handleLoadStudents();
  }, []);

  return (
    <Container>
      <TopBar marginTop={StatusBar.currentHeight}>
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
            Alert.alert('Atenção', 'Deseja realmente sair da discussão?', [
              {
                text: 'Não',
                style: 'cancel'
              },
              {
                text: 'Sim',
                onPress: () => {
                  handleUnsavedChanges();
                }
              }
            ]);
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
          onPress={() =>
            Alert.alert('Atenção', 'Deseja realmente finalizar a discussão?', [
              {
                text: 'Não',
                style: 'cancel'
              },
              {
                text: 'Sim',
                onPress: () => {
                  timer(0);
                  handleCreateDiscussionResult();
                }
              }
            ])
          }>
          <ButtonText>FINALIZAR DISCUSSÃO</ButtonText>
        </Button>
      </ButtonsWrapper>
    </Container>
  );
}
