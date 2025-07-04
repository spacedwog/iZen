import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MeditarScreen from '../screens/MeditarScreen.tsx';
import HistoricoScreen from '../screens/HistoricoScreen.tsx';
import AudioScreen from '../screens/AudioScreen.tsx';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen.tsx';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Meditar" component={MeditarScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
      <Tab.Screen name="Áudio" component={AudioScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}