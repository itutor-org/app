import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Foundation } from '@expo/vector-icons';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  Container,
  TopBar,
  Wrapper,
  Title,
  TimeText,
  Subtitle,
  CardsWrapper,
  StudentCard,
  StudentCardText,
  InteractionsWrapper,
  InteractionCard,
  InteractionCardText,
  ButtonsWrapper,
  InteractionButtonsWrapper,
  TopicWrapper,
  StudentCardView,
  ImageBackgroundStudent
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Alert, Dimensions, ImageBackground, View } from 'react-native';
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
import { useLoading } from '../../../contexts/loading';
import { ButtonInteraction } from '../../../components/ButtonInteraction';
import { images, ImageItem } from './images';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Discussion({ navigation, route }: Props) {
  const { setLoading } = useLoading();

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
  const [countdownInterval, setCountdownInterval] =
    React.useState<NodeJS.Timeout>();

  function timer(duration: number) {
    let timer = duration,
      minutes: string | number,
      seconds: string | number;
    const interval = setInterval(async function () {
      minutes = parseInt(String(timer / 60), 10);
      seconds = parseInt(String(timer % 60), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setCountdown(`${minutes}:${seconds}`);

      if (--timer < 0) {
        timer = 0;
        clearInterval(interval);
        setCountdown('00:00');

        try {
          const interactions = await getInteractionByDiscussion(
            route.params.discussion_id
          );

          if (interactions.length > 0) {
            Alert.alert('Tempo esgotado!', 'A discussão foi encerrada.', [
              {
                text: 'OK',
                onPress: () => {
                  handleCreateDiscussionResult();
                }
              }
            ]);
          } else {
            Alert.alert(
              'Tempo esgotado!',
              'Como a discussão não possui nenhuma interação, iremos levá-lo de volta à listagem de discussões',
              [
                {
                  text: 'OK',
                  onPress: async () => {
                    try {
                      await deleteDiscussion(route.params.discussion_id);
                      navigation.navigate('DiscussionsList', {
                        group_id: route.params.group_id,
                        participants_number: route.params.participants_number
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              ]
            );
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível finalizar a discussão');
        }
      }
    }, 1000);

    setCountdownInterval(interval);
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
      setLoading(true);
      clearInterval(countdownInterval);
      setCountdown('00:00');
      await deleteInteractionsByDiscussion(route.params.discussion_id);

      await deleteDiscussion(route.params.discussion_id);

      navigation.dispatch(action);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro ao deletar discussão', error.message);
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
      setLoading(true);
      clearInterval(countdownInterval);
      setCountdown('00:00');
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
      setLoading(false);
      Alert.alert('Erro ao criar resultado da discussão', error.message);
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
    }
  }

  React.useEffect(() => {
    handleLoadStudents().finally(() => {
      timer(route.params.duration * 60);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      if (e.data.action.type === 'GO_BACK') {
        Alert.alert(
          'Atenção?',
          'Você tem certeza que deseja sair? Todas os seus dados serão perdidos.',
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Confirmar',

              onPress: () => {
                handleUnsavedChanges(e.data.action);
              }
            }
          ]
        );
      } else {
        navigation.dispatch(e.data.action);
      }
    });
  }, [navigation]);
  
  //pegar as dimensões altura e largura da tela
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Calcula as dimensões e posição central da mesa
  const rectangleWidth = screenWidth * 0.8;
  const rectangleHeight = screenHeight * 0.67;
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  // Calcula a posição de cada estudante ao redor da mesa
  const studentsCount = students.length;
  const topStudentsCount = 1;
  const sideStudentsCount = 4;

  const topCardY = centerY - rectangleHeight / 1.7;
  const sideCardX = centerX - rectangleWidth / 2.2;
  const sideCardYStep = rectangleHeight / (sideStudentsCount + 1);
  const bottomCardY = centerY + rectangleHeight / 2.2;

  const topCard = students.slice(0, topStudentsCount).map((student) => {
    return (
      <StudentCardView
      style={{
        position: 'absolute',
        left: centerX - 65 / 2,
        top: centerY - rectangleHeight / 1.65,
      }}
      >
        <StudentCardText>{student.name}</StudentCardText>
        
      <StudentCard
        key={student.name}
        isSelected={student.isSelected}
        color={() => handleColor(student.id)}
        onPress={() => handleSelectStudent(student, students, setStudents)}
        
      >
        {images.map((image: ImageItem) => (
        <ImageBackgroundStudent
         key={image.id}
         source={image.source}
       />
       ))}
      </StudentCard>
      </StudentCardView>
    );
  });

  const leftCards = students.slice(topStudentsCount, topStudentsCount + sideStudentsCount).map((student, index) => {
    const cardY = topCardY + sideCardYStep * (index + 1);

    return (
      <StudentCardView
      style={{
        position: 'absolute',
        left: sideCardX,
        top: cardY,
      }}>
        <StudentCardText>{student.name}</StudentCardText>
      <StudentCard
        key={student.name}
        isSelected={student.isSelected}
        color={() => handleColor(student.id)}
        onPress={() => handleSelectStudent(student, students, setStudents)}
       
      >
        {images.map((image: ImageItem) => (
        <ImageBackgroundStudent
         key={image.id}
         source={image.source}
       />
       ))}
        
      </StudentCard>
      </StudentCardView>
    );
  });

  const rightCards = students.slice(topStudentsCount + sideStudentsCount, topStudentsCount + sideStudentsCount * 2).map((student, index) => {
    const cardY = topCardY + sideCardYStep * (index + 1);

    return (
      <StudentCardView
      style={{
        position: 'absolute',
        left: sideCardX + rectangleWidth - 100,
        top: cardY,
      }}
      >
        <StudentCardText>{student.name}</StudentCardText>
      <StudentCard
        key={student.name}
        isSelected={student.isSelected}
        color={() => handleColor(student.id)}
        onPress={() => handleSelectStudent(student, students, setStudents)}
        
      >
        {images.map((image: ImageItem) => (
        <ImageBackgroundStudent
         key={image.id}
         source={image.source}
       />
       ))}
        
      </StudentCard>
      </StudentCardView>
    );
  });

  const bottomCards = students.slice(topStudentsCount + sideStudentsCount * 2).map((student, index) => {
    const cardY = bottomCardY;
    return (
      <StudentCardView
      style={{
        position: 'absolute',
        left: centerX - 65 / 2,
        top: cardY,
      }}
      >
        <StudentCardText>{student.name}</StudentCardText>
      <StudentCard
        key={student.name}
        isSelected={student.isSelected}
        color={() => handleColor(student.id)}
        onPress={() => handleSelectStudent(student, students, setStudents)}
        
      >
        {images.map((image: ImageItem) => (
        <ImageBackgroundStudent
         key={image.id}
         source={image.source}
       />
       ))}
        
      </StudentCard>
      </StudentCardView>
    );
  });


  return (
    <Container>
      <TopBar>
        <Wrapper>
          <MaterialIcons
            name="watch-later"
            size={30}
            color={theme.colors.white}
          />
          <TimeText>{countdown} min</TimeText>
        </Wrapper>
        <TopicWrapper>
          <Title>{route.params.general_subject}</Title>
          <Subtitle>{route.params.specific_subject}</Subtitle>
        </TopicWrapper>
        <AntDesign
          name="closecircleo"
          size={30}
          color={theme.colors.white}
          onPress={() => navigation.goBack()}
        />
      </TopBar>

      <InteractionsWrapper style={{ 
  transform: [
    { translateX: -(screenWidth * 0.25) / 2 }, 
    { translateY: -(screenHeight * 0.5) / 2 }
  ] 
}}>
        {actions.map((interaction) => (
          <InteractionCard
            key={interaction.name}
            color={interaction.color}
            isSelected={interaction.isSelected}
            onPress={() => {
              handleStoreAction(interaction.name);
            }}>
            <Foundation key={interaction.name} name={interaction.iconName} size={30} color="white" />
          </InteractionCard>
        ))}
         <ButtonInteraction
            
          onPress={handleStoreInteraction}
          style={{
            marginTop: theme.margins.SSM,
            marginBottom: theme.margins.SSM,
            backgroundColor: theme.colors.medium_green
          }} name={'check'} size={30} color={'white'}          />
          <ButtonInteraction
          onPress={handleResetInteraction}
          style={{
            marginTop: theme.margins.SSM,
            marginBottom: theme.margins.SSM,
            backgroundColor: theme.colors.light_orange
          }} name={'alert'} size={30} color={'white'}          />
          
      </InteractionsWrapper>


      <CardsWrapper style={{
        position: 'absolute',
      }}>
        {topCard}
        {leftCards}
        {rightCards}
        {bottomCards}
      </CardsWrapper>

       <ButtonInteraction
          style={{
            position: 'absolute',
            left: sideCardX,
            top: bottomCardY + 25,
            backgroundColor: theme.colors.red
          }}
          
        onPress={() => Alert.alert('Atenção', 'Deseja realmente finalizar a discussão?', [
          {
            text: 'Não',
            style: 'cancel'
          },
          {
            text: 'Sim',
            onPress: () => handleCreateDiscussionResult()
          }
        ])} name={'flag'} size={30} color={'white'}        /> 

    </Container>
  );
}
