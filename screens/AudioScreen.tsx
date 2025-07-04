import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Button, Alert } from 'react-native';

type Audio = {
  id: number;
  title: string;
  url: string;
};

export default function AudioScreen() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const fetchAudios = () => {
    setLoading(true);
    fetch('http://192.168.15.8:5000/audios')
      .then(response => response.json())
      .then(data => {
        setAudios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar áudios:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  const handleSubmit = () => {
    if (!title || !url) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    fetch('http://192.168.15.8:5000/audios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao adicionar áudio');
        return response.json();
      })
      .then(newAudio => {
        setAudios([...audios, newAudio]);
        setTitle('');
        setUrl('');
        Alert.alert('Sucesso', 'Áudio adicionado!');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível adicionar o áudio.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Áudios Relaxantes</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do áudio"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="URL do áudio"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Adicionar Áudio" onPress={handleSubmit} />

      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <FlatList
          data={audios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.audioItem}>
              <Text style={styles.audioText}>{item.title}</Text>
              <Text style={styles.audioUrl}>{item.url}</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  audioItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  audioText: { fontSize: 18, fontWeight: 'bold' },
  audioUrl: { fontSize: 14, color: 'gray' },
});