import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { Loading } from '../components/Loading';

interface LoadingProviderProps {
  children: ReactNode;
}

interface LoadingContextData {
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        setLoading
      }}>
      <Loading visible={loading} showModal={setLoading} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  return context;
}
