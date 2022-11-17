import React from 'react';
import { Loading } from '../components/Loading';

interface LoadingProviderProps {
  children: React.ReactNode;
}

interface LoadingContextData {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = React.createContext<LoadingContextData>(
  {} as LoadingContextData
);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = React.useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <Loading visible={loading} showModal={setLoading} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = React.useContext(LoadingContext);

  return context;
}
