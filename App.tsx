import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';

import { Routes } from './src/routes';
import { GlobalContext } from './src/contexts/GlobalContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
  });

  return (
    <GlobalContext>
      {fontsLoaded ? <Routes /> : null}
      <StatusBar style="light" />
    </GlobalContext>
  );
}
