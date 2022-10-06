import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';
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
  GroupCard,
  GroupList,
  GroupCardSection,
  GroupNameText,
  GroupButton,
  GroupButtonText,
  GroupCardRightSection,
  GroupSectionWrapper,
  TopBar,
  TeacherInfo,
  TeacherName,
  TeacherEmail,
  CMText,
  CMConfirmButton,
  CMDenyButton,
  CMButtonsWrapper,
  CMButtonText
} from './styles';
import { theme } from '../../../styles/theme';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import ModalComponent from '../../../components/Modal';
import { deleteGroup, getGroups, Group } from '../../../services/groupService';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { logoff, user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  async function handleDeleteGroup(groupId: string) {
    await deleteGroup(groupId).then(() => {
      setShowConfirmationModal(!showConfirmationModal);
    });
  }

  async function handleSearch(text: string) {
    if (text) {
      const newData = filteredGroups.filter((item) => {
        return item ? item.name.includes(text) : '';
      });

      setFilteredGroups(newData);
    } else {
      setFilteredGroups(groups);
    }
  }

  async function loadGroups() {
    await getGroups(user.id)
      .then((data) => {
        setGroups(data);
        setFilteredGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadGroups();
  }, [groups]);

  return (
    <HomeContainer>
      <TopBar marginTop={StatusBar.currentHeight + 15}>
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
        <Title>GRUPOS</Title>

        <SearchWrapper>
          <SearchInputWrapper>
            <SearchInput
              placeholder="Pesquisar"
              onChangeText={(value: string) => {
                handleSearch(value);
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
            onPress={() => navigation.navigate('AddGroup')}
          />
        </SearchWrapper>

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={filteredGroups}
            keyExtractor={({ id }: Group) => id}
            renderItem={({ item }) => (
              <GroupCard>
                <GroupCardSection>
                  <GroupNameText>{item.name}</GroupNameText>
                  <GroupButton>
                    <GroupButtonText>ACESSAR GRUPO</GroupButtonText>
                  </GroupButton>
                </GroupCardSection>
                <GroupCardRightSection>
                  <GroupSectionWrapper>
                    <FontAwesome5 name="users" size={20} color="#4e4e4e" />
                    <Text
                      style={{
                        fontWeight: '900',
                        marginLeft: 10,
                        marginRight: 5
                      }}>
                      {item.participants_number}
                    </Text>
                  </GroupSectionWrapper>

                  <GroupSectionWrapper>
                    <Feather
                      name="edit"
                      size={25}
                      color={theme.colors.gray_200}
                      onPress={() => {
                        navigation.navigate('EditGroup', {
                          groupId: item.id,
                          name: item.name,
                          participantsNumber: item.participants_number,
                          className: item.class_name
                        });
                      }}
                    />

                    <MaterialIcons
                      name="delete"
                      size={25}
                      color={theme.colors.gray_200}
                      style={{
                        marginLeft: 15
                      }}
                      onPress={() =>
                        setShowConfirmationModal(!showConfirmationModal)
                      }
                    />

                    <ModalComponent
                      title=""
                      showModal={setShowConfirmationModal}
                      visible={showConfirmationModal}
                      children={
                        <>
                          <CMText>
                            Tem certeza que deseja excluir o grupo?
                          </CMText>
                          <CMButtonsWrapper>
                            <CMConfirmButton
                              onPress={() => handleDeleteGroup(item.id)}>
                              <CMButtonText>SIM</CMButtonText>
                            </CMConfirmButton>
                            <CMDenyButton
                              onPress={() =>
                                setShowConfirmationModal(!showConfirmationModal)
                              }>
                              <CMButtonText>NÃO</CMButtonText>
                            </CMDenyButton>
                          </CMButtonsWrapper>
                        </>
                      }
                    />
                  </GroupSectionWrapper>
                </GroupCardRightSection>
              </GroupCard>
            )}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
