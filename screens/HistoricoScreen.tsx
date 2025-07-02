import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getAllMeditationData } from '../utils/storage';

export default function HistoricoScreen() {
  const [data, setData] = useState<{ date: string; seconds: number }[]>([]);

  useEffect(() => {
    (async () => {
      const dados = await getAllMeditationData();
      setData(dados);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Histórico de Meditação</Text>
      {data.map((item, idx) => (
        <Text key={idx}>{item.date}: {item.seconds}s</Text>
      ))}
    </ScrollView>
  );
}