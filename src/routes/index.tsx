import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/useAuth';
import { theme } from '../styles/theme';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { isLoggedIn } = useAuth();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.dark_blue
      }}>
      <NavigationContainer>
        {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
