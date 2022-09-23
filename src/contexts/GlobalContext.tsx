import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../styles/theme';
import { UserProvider } from './useAuth';

export function GlobalContext({ children }: any) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
