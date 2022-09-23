import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/useAuth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
