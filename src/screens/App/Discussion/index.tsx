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
  StudentCardTop,
  StudentCardBottom,
  StudentCardText,
  InteractionsWrapper,
  InteractionCard,
  InteractionCardText,
  ButtonsWrapper,
  Button,
  ButtonText
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

type Props = NativeStackScreenProps<AppStackParamList, 'Discussion'>;

export function Discussion({ navigation, route }: Props) {
  const [students, setStudents] = React.useState([
    {
      name: 'Rodger',
      isSelected: false
    },
    {
      name: 'Hale',
      isSelected: false
    },
    {
      name: 'Barr',
      isSelected: false
    },
    {
      name: 'Freeman',
      isSelected: false
    },
    {
      name: 'Bern',
      isSelected: false
    },
    {
      name: 'Gery',
      isSelected: false
    },
    {
      name: 'Neill',
      isSelected: false
    },
    {
      name: 'Cammie',
      isSelected: false
    },
    {
      name: 'Lucas',
      isSelected: false
    },
    {
      name: 'Pedro',
      isSelected: false
    },
    {
      name: 'Elielson',
      isSelected: false
    },
    {
      name: 'Márcio',
      isSelected: false
    }
  ]);
  const [topStudents, setTopStudents] = React.useState(students.slice(0, 8));
  const [bottomStudents, setBottomStudents] = React.useState(
    students.slice(8, students.length)
  );

  const [interactions, setInteractions] = React.useState<any>([
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

  const [interaction, setInteraction] = React.useState<any>({
    starter: null,
    type: null,
    finisher: null
  });

  const [countdown, setCountdown] = React.useState(route.params.duration);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  /*
    {
      starter: 'Rodger',
      type: 'Concordou',
      finisher: 'Hale',
    }

  */

  // async function handleStoreInteraction() {
  //   setInteractions((oldArray) => [
  //     ...oldArray,
  //     {
  //       discussion_id: route.params.discussion_id,
  //       starter_id: starter.id,
  //       finisher_id: finisher.id,
  //       interaction_type: interactionType
  //     }
  //   ]);
  // }

  function handleSelected(student: any, array: any, setArray: any) {
    const newStudents = array.map((item: any) => {
      if (item.name === student.name) {
        item.isSelected = !item.isSelected;
      } else {
        item.isSelected = false;
      }
      return item;
    });
    setArray(newStudents);
  }

  // function handleStoreInteraction() {
  //   const selectedStudents = students.filter((student) => student.isSelected);
  //   const selectedInteractions = interactions.filter(
  //     (interaction) => interaction.isSelected
  //   );
  //   const interaction = {
  //     discussion_id: route.params.discussion_id,
  //     starter_id: selectedStudents[0].id,
  //     finisher_id: selectedStudents[1].id,
  //     interaction_type: selectedInteractions[0].tag
  //   };
  //   console.log(interaction);
  // }

  // function loadStudents() {
  //   setTopStudents(students.slice(0, 8));
  //   setBottomStudents(students.slice(8, students.length));
  // }

  function handleFinalize() {
    navigation.navigate('Results', {
      discussion_id: route.params.discussion_id
    });
  }

  // React.useEffect(() => {
  // }, []);

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
          <Subtitle>{route.params.duration} min</Subtitle>
        </Wrapper>
        <Wrapper
          style={{
            marginRight: 20
          }}>
          <Title>{route.params.general_subject}</Title>
          <Subtitle>{route.params.specific_subject}</Subtitle>
        </Wrapper>
        <AntDesign name="closecircleo" size={30} color={theme.colors.white} />
      </TopBar>
      <Middle>
        <CardsWrapper>
          {topStudents.map((student) => (
            <StudentCardTop
              key={student.name}
              isSelected={student.isSelected}
              onPress={() =>
                handleSelected(student, topStudents, setTopStudents)
              }>
              <StudentCardText>{student.name}</StudentCardText>
            </StudentCardTop>
          ))}
        </CardsWrapper>
        <InteractionsWrapper>
          {interactions.map((interaction) => (
            <InteractionCard
              key={interaction.name}
              color={interaction.color}
              isSelected={interaction.isSelected}
              onPress={() =>
                handleSelected(interaction, interactions, setInteractions)
              }>
              <InteractionCardText>{interaction.tag}</InteractionCardText>
            </InteractionCard>
          ))}
        </InteractionsWrapper>
        <CardsWrapper>
          {bottomStudents.map((student) => (
            <StudentCardBottom
              key={student.name}
              isSelected={student.isSelected}
              onPress={() =>
                handleSelected(student, bottomStudents, setBottomStudents)
              }>
              <StudentCardText>{student.name}</StudentCardText>
            </StudentCardBottom>
          ))}
        </CardsWrapper>
      </Middle>
      <ButtonsWrapper>
        <Button isSubmit={true}>
          <ButtonText>GUARDAR INTERAÇÃO</ButtonText>
        </Button>
        <Button
          isSubmit={false}
          onPress={() => setShowConfirmationModal(!showConfirmationModal)}>
          <ButtonText>FINALIZAR DISCUSSÃO</ButtonText>
        </Button>
      </ButtonsWrapper>

      <ConfirmationModal
        message="Deseja mesmo finalizar essa discussão?"
        showModal={setShowConfirmationModal}
        visible={showConfirmationModal}
        handleAction={handleFinalize}
      />
    </Container>
  );
}
