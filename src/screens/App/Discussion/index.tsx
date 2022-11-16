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
  InteractionButtonsWrapper,
  TopicWrapper
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  deleteDiscussion,
  updateDiscussion
} from '../../../services/discussionService';
import {
  createInteraction,
  deleteInteractionsByDiscussion,
  getInteractionByDiscussion
} from '../../../services/interactionService';
import { ScreenStudent } from '../../../entities/student.entity';
import { Action, Interaction } from '../../../entities/interaction.entity';
import { createDiscussionResult } from '../../../services/graphService';

import { getStudentsByGroup } from '../../../services/studentService';
import { actionsList } from './actions';
import { Button } from '../../../components/Button';

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

  async function handleUnsavedChanges(action: any) {
    try {
      await deleteInteractionsByDiscussion(route.params.discussion_id);

      await deleteDiscussion(route.params.discussion_id);

      navigation.dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }

  function handleColor(student_id: string): string {
    if (!student_id) {
      return theme.colors.white;
    } else if (student_id === currentInteraction.starter?.id) {
      return theme.colors.orange;
    } else if (student_id === currentInteraction.finisher?.id) {
      return theme.colors.purple;
    }
  }

  async function handleCreateDiscussionResult() {
    try {
      const interactions = await getInteractionByDiscussion(
        route.params.discussion_id
      );

      const discussionResultFromApi = await createDiscussionResult(
        interactions
      );

      await updateDiscussion(
        route.params.discussion_id,
        'good',
        discussionResultFromApi.graph,
        discussionResultFromApi.random_percent
      );

      navigation.navigate('Results', {
        discussion_id: route.params.discussion_id,
        group_id: route.params.group_id,
        participants_number: route.params.participants_number,
        discussion_result: discussionResultFromApi
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadStudents() {
    try {
      const studentsByGroup = await getStudentsByGroup(route.params.group_id);

      setStudents(
        studentsByGroup.map((student) => ({
          id: student.id,
          name: student.name,
          registration: student.registration,
          email: student.email,
          group_id: student.group_id,
          isSelected: false
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      timer(60 * route.params.duration);
    }
  }

  React.useEffect(() => {
    handleLoadStudents();
  }, []);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Atenção?',
        'Você tem certeza que deseja sair? Todas os seus dados serão perdidos.',
        [
          {
            text: 'Voltar',
            style: 'cancel'
          },
          {
            text: 'Sair',

            onPress: () => {
              handleUnsavedChanges(e.data.action);
            }
          }
        ]
      );
    });
  }, [navigation]);

  return (
    <Container>
      <TopBar marginTop={StatusBar.currentHeight + 10}>
        <Wrapper>
          <MaterialIcons
            name="watch-later"
            size={30}
            color={theme.colors.white}
          />
          <TimeText>{countdown} min</TimeText>
        </Wrapper>
        <Wrapper
          style={{
            marginRight: 20
          }}></Wrapper>
        <AntDesign
          name="closecircleo"
          size={30}
          color={theme.colors.white}
          onPress={() => navigation.goBack()}
        />
      </TopBar>

      <TopicWrapper>
        <Title>{route.params.general_subject}</Title>
        <Subtitle>{route.params.specific_subject}</Subtitle>
      </TopicWrapper>
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
          <Button
            text="GUARDAR INTERAÇÃO"
            onPress={handleStoreInteraction}
            style={{
              width: '58%',
              backgroundColor: theme.colors.medium_green
            }}
          />

          <Button
            text="DESCARTAR"
            onPress={handleResetInteraction}
            style={{
              width: '40%',
              backgroundColor: theme.colors.light_red
            }}
          />
        </InteractionButtonsWrapper>

        <Button
          text="FINALIZAR DISCUSSÃO"
          style={{
            width: '95%'
          }}
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
          }
        />
      </ButtonsWrapper>
    </Container>
  );
}
