import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  HomeContainer,
  ActionText,
  SearchInputWrapper,
  SearchInput,
  SearchWrapper,
  GroupsWrapper,
  GroupCard,
  GroupList,
  GroupCardSection,
  GroupNameText,
  GroupButton,
  GroupButtonText,
  GroupCardRightSection,
  ActionButtonsWrapper
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff } = useAuth();

  const groups = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    }
  ];

  return (
    <HomeContainer>
      <ActionText>GRUPOS</ActionText>

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
        />
      </SearchWrapper>

      <TouchableOpacity onPress={logoff}>
        <Text> Sign Out</Text>
      </TouchableOpacity>

      <GroupsWrapper>
        <GroupList
          data={groups}
          renderItem={() => (
            <GroupCard>
              <GroupCardSection>
                <GroupNameText>MED TARDE 2022</GroupNameText>
                <GroupButton>
                  <GroupButtonText>ACESSAR GRUPO</GroupButtonText>
                </GroupButton>
              </GroupCardSection>
              <GroupCardRightSection>
                <ActionButtonsWrapper>
                  <MaterialIcons
                    name="edit"
                    size={30}
                    color={theme.colors.gray_200}
                  />

                  <MaterialIcons
                    name="delete"
                    size={30}
                    color={theme.colors.gray_200}
                  />
                </ActionButtonsWrapper>
              </GroupCardRightSection>
            </GroupCard>
          )}
          keyExtractor={(item) => item.id}
        />
      </GroupsWrapper>
    </HomeContainer>
  );
}
