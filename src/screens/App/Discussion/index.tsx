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
import { createInteraction } from '../../../services/interactionService';
import { ScreenStudent, Student } from '../../../entities/student.entity';
import { Action, Interaction } from '../../../entities/interaction.entity';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Discussion({ navigation, route }: Props) {
  const [students, setStudents] = React.useState<ScreenStudent[]>([
    {
      id: 'a02a40cd-29af-454e-8522-235bc4a86f30',
      name: 'Wildon',
      registration: '68441159',
      email: 'wcraddock0@google.nl',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: '2b3f53ff-0bfe-41c7-9309-6009e886dba6',
      name: 'Clem',
      registration: '34375750',
      email: 'ccorre1@dailymail.co.uk',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: 'b62e4d63-7b29-4e60-8c55-1a6bbf9286f0',
      name: 'Kakalina',
      registration: '54144494',
      email: 'kshier2@geocities.com',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: 'c4aadb34-f9fc-4a37-9741-b229729be9d0',
      name: 'Morissa',
      registration: '65113852',
      email: 'mcottier3@pinterest.com',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: '391a98fd-3722-439b-8b4b-231c92b3f702',
      name: 'Dory',
      registration: '66466710',
      email: 'dbrunon4@washington.edu',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: '9d093e6d-eea2-4d2d-a92b-3e69ddfb6f21',
      name: 'Lynnea',
      registration: '18259499',
      email: 'lwarlow5@plala.or.jp',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: '34a4a924-7ba4-4120-8bab-a9a8c5926323',
      name: 'Charlotta',
      registration: '61084498',
      email: 'cskyppe6@csmonitor.com',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: '40f983fa-11ae-49f4-8aa9-056d8dac063e',
      name: 'Vania',
      registration: '33897937',
      email: 'vcorbould7@nbcnews.com',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: 'ba26fbf6-8d83-4e3c-a89c-df139c743dc1',
      name: 'Mannie',
      registration: '54925047',
      email: 'mherety8@ca.gov',
      isSelected: false,
      group_id: route.params.group_id
    },
    {
      id: 'ceab0551-4f22-4f6e-99cd-662cfc57d585',
      name: 'Diana',
      registration: '35223664',
      email: 'dwase9@desdev.cn',
      isSelected: false,
      group_id: route.params.group_id
    }
  ]);
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
    starter: {} as Student,
    type: '',
    finisher: {} as Student
  });

  const [countdown, setCountdown] = React.useState(route.params.duration);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] =
    React.useState(false);

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
          starter: {} as Student
        });
      } else if (interaction.finisher.id === student.id) {
        setInteraction({
          ...interaction,
          finisher: {} as Student
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
      starter: {} as Student,
      type: '',
      finisher: {} as Student
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
    await createInteraction(
      interaction.discussion_id,
      interaction.starter,
      interaction.type,
      interaction.finisher
    ).then(() => {
      handleResetInteraction();
    });
  }

  function handleFinalize() {
    navigation.replace('Results', {
      discussion_id: route.params.discussion_id,
      group_id: route.params.group_id,
      participants_number: route.params.participants_number
    });
  }

  async function handleUnsavedChanges() {
    await deleteDiscussion(route.params.discussion_id)
      .then(() => {
        navigation.popToTop();
        setShowUnsavedChangesModal(!showUnsavedChangesModal);
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

  React.useEffect(() => {
    // const interval = setInterval(() => {
    //   setCountdown(countdown - 1);
    // }, 60000);
    // setTimeout(() => {
    //   clearInterval(interval);
    //   setShowConfirmationModal(true);
    // }, countdown * 60000); // 1 minuto = 60000ms
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
          onPress={() => setShowUnsavedChangesModal(!showUnsavedChangesModal)}
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
        handleAction={handleFinalize}
      />

      <ConfirmationModal
        message={
          'Deseja finalizar esta discussão? Você perderá todos os dados gerados nessa sessão'
        }
        showModal={setShowUnsavedChangesModal}
        visible={showUnsavedChangesModal}
        handleAction={handleUnsavedChanges}
      />
    </Container>
  );
}
