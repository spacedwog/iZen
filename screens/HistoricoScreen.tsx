import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getAllMeditationData } from '../utils/storage';
import { formatDuration, secondsToDuration } from '../utils/timeUtils';

export default function HistoricoScreen() {
  const [data, setData] = useState<{ date: string; seconds: number }[]>([]);

  useEffect(() => {
    (async () => {
      const dados = await getAllMeditationData();
      setData(dados);
    })();
  }, []);

  // Cálculos simplificados de total por períodos
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  const totalToday = data
    .filter((d) => d.date === todayStr)
    .reduce((acc, d) => acc + d.seconds, 0);

  // Semana começa domingo (0) e vai até sábado (6)
  const startWeek = new Date(now);
  startWeek.setDate(now.getDate() - now.getDay());

  const totalWeek = data
    .filter((d) => {
      const date = new Date(d.date);
      return date >= startWeek && date <= now;
    })
    .reduce((acc, d) => acc + d.seconds, 0);

  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalMonth = data
    .filter((d) => {
      const date = new Date(d.date);
      return date >= startMonth && date <= now;
    })
    .reduce((acc, d) => acc + d.seconds, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de Meditação</Text>
      <Text>Hoje: {formatDuration(secondsToDuration(totalToday))}</Text>
      <Text>Esta Semana: {formatDuration(secondsToDuration(totalWeek))}</Text>
      <Text>Este Mês: {formatDuration(secondsToDuration(totalMonth))}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Detalhes por Dia:</Text>
        {data.map((item, idx) => (
          <Text key={idx}>
            {item.date}: {formatDuration(secondsToDuration(item.seconds))}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});