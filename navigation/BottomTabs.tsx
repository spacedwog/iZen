import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MeditarScreen from '../screens/MeditarScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import AudioScreen from '../screens/AudioScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';

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