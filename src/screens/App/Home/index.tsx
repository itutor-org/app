import React from 'react';
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
import { deleteGroup, getGroups } from '../../../services/groupService';
import { HomeCard } from '../../../components/HomeCard';
import { Group } from '../../../entities/group.entity';

import { TopBar } from '../../../components/TopBar';
import { SearchBar } from '../../../components/SearchBar';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function Home({ navigation, route }: Props) {
  const { user } = useAuth();

  const [groups, setGroups] = React.useState<Group[]>([]);
  const [searchText, setSearchText] = React.useState('');

  async function handleDeleteGroup(group_id: string): Promise<void> {
    try {
      await deleteGroup(group_id);
      groups.splice(
        groups.findIndex((group) => group.id === group_id),
        1
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function loadGroups() {
    try {
      const groups = await getGroups(user?.id);
      setGroups(groups);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    loadGroups();
  }, [groups]);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <HomeContainer>
      <TopBar navigation={navigation} isHome={true} />
      <GroupContainer>
        <Title>GRUPOS</Title>

        <SearchBar
          onChangeText={(value) => setSearchText(value)}
          iconAction={() => navigation.navigate('AddGroup')}
        />

        <GroupsWrapper>
          <GroupList
            showsVerticalScrollIndicator={false}
            data={groups.filter((group) => {
              if (searchText === '') {
                return group;
              } else if (
                group.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return group;
              }
            })}
            keyExtractor={({ id }: Group) => id}
            renderItem={({ item }: any) => (
              <HomeCard
                id={item.id}
                name={item.name}
                participants_number={item.participants_number}
                class_name={item.class_name}
                deleteAction={() => handleDeleteGroup(item.id)}
                navigation={navigation}
              />
            )}
          />
        </GroupsWrapper>
      </GroupContainer>
    </HomeContainer>
  );
}
