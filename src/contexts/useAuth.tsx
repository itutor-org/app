import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';
import { createUser, getUser } from '../services/userService';
import { User } from '../entities/user.entity';

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  isLoggedIn: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  logoff: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    registration: string,
    password: string
  ) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function loadStoredData() {
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedUser) {
        const userData: User = JSON.parse(storedUser);
        if (userData.email) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    }

    loadStoredData();
  }, []);

  async function signIn(email: string, password: string) {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (info) => {
        const data = await getUser(info.user.uid);
        setUser(data);
        await SecureStore.setItemAsync('user', JSON.stringify(data));
      })
      .catch((error) => {
        throw error.code;
      });
  }

  async function logoff() {
    await auth()
      .signOut()
      .then(async () => {
        await SecureStore.deleteItemAsync('user');
        setUser(null);
      })
      .catch((error) => {
        throw error.code;
      });
  }

  async function recoverPassword(email: string) {
    await auth()
      .sendPasswordResetEmail(email)
      .catch((error) => {
        throw error.code;
      });
  }

  async function registerUser(
    name: string,
    email: string,
    registration: string,
    password: string
  ) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const id = auth().currentUser.uid;
        await createUser({ name, email, id, registration });
        auth().signOut();
      })
      .catch((error) => {
        throw error.code;
      });
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: user !== null,
        user: user,
        signIn,
        logoff,
        recoverPassword,
        registerUser
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);

  return context;
}
