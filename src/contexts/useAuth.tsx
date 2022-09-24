import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import * as SecureStore from 'expo-secure-store';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.User | null;
  signIn: (email: string, password: string) => Promise<void>;
  logoff: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    async function loadStoredData() {
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedUser) {
        const userData: FirebaseAuthTypes.User = JSON.parse(storedUser);
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
        setUser(info.user);
        await SecureStore.setItemAsync('user', JSON.stringify(info.user));
      })
      .catch((error) => {
        throw error.message;
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

  async function registerUser(email: string, password: string) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().signOut();
      })
      .catch((error) => {
        throw error.code;
      });
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: auth().currentUser && user !== null,
        user: user || null,
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
