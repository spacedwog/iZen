import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AudioScreen() {
  return (
    <View style={styles.container}>
      <Text>Lista de áudios relaxantes disponíveis.</Text>
      <Text>Em breve, integração com backend para geração dinâmica.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});