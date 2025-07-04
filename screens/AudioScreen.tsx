import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

type Audio = {
  id: number;
  title: string;
  url: string;
};

export default function AudioScreen() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://0.0.0.0:5000/audios')
      .then(response => response.json())
      .then(data => {
        setAudios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar áudios:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Áudios Relaxantes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <FlatList
          data={audios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.audioItem}>
              <Text style={styles.audioText}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  audioItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  audioText: { fontSize: 18 },
});