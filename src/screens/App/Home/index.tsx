import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/useAuth';
import { AppStackParamList } from '../../../routes/app.routes';
import {
  GroupContainer,
  Title,
  GroupsWrapper,
  GroupList,
  Container
} from './styles';
import { deleteGroup, getGroups } from '../../../services/groupService';
import { HomeCard } from '../../../components/HomeCard';
import { Group } from '../../../entities/group.entity';

import { TopBar } from '../../../components/TopBar';
import { SearchBar } from '../../../components/SearchBar';
import { useLoading } from '../../../contexts/loading';
import { Alert, Keyboard, Platform } from 'react-native';
import { Header } from '../../../components/Header/Header';


type Props = NativeStackScreenProps<AppStackParamList, 'Home'> & {
  iconAction: () => void;
};

export function Home({ navigation, route, iconAction }: Props) {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();

  const [groups, setGroups] = React.useState<Group[]>([]);
  const [searchText, setSearchText] = React.useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Event handler para quando o teclado é exibido
  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  // Event handler para quando o teclado é ocultado
  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    // Registrar os listeners para os eventos do teclado
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardDidShow
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardDidHide
    );

    // Remover os listeners quando o componente é desmontado
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  async function handleDeleteGroup(group_id: string): Promise<void> {
    try {
      setLoading(true);
      await deleteGroup(group_id);
      groups.splice(
        groups.findIndex((group) => group.id === group_id),
        1
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro ao deletar grupo', error);
    }
  }

  async function loadGroups() {
    try {
      const groups = await getGroups(user?.id);
      setGroups(groups);
    } catch (error) {
      Alert.alert('Erro ao carregar grupos', error);
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

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, []);

  return (
    <Container>
      {!isKeyboardVisible && (
      <TopBar navigation={navigation} isHome={true} />
      )}
      <GroupContainer>

        <Header title='GRUPOS'
        iconAction={() => navigation.navigate('AddGroup')} />

        <SearchBar
          onChangeText={(value) => setSearchText(value)}
        />

        <GroupsWrapper>
          {groups.length > 0 ? (
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
          ) : (
            <Title style={{ color: 'white' }}>Nenhum grupo encontrado</Title>
          )}
        </GroupsWrapper>
      </GroupContainer>
    </Container>
  );
}
 