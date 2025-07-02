import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text>Configurações do iZen</Text>
      <Text>Modo escuro, tempo padrão, sons favoritos (em desenvolvimento)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});