import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { syncWithServer } from '../utils/storage.ts'; // ajuste caminho conforme estrutura

type DadosMeditacao = {
  dia: string;
  minutos: number;
};

export default function ConfiguracoesScreen() {
  const [dados, setDados] = useState<DadosMeditacao[]>([]);

  useEffect(() => {
    async function carregarDados() {
      await syncWithServer();
      fetch('http://192.168.15.8:5000/meditacao')
        .then((response) => response.json())
        .then((data) => setDados(data))
        .catch((error) => console.error('Erro:', error));
    }

    carregarDados();
  }, []);

  const dias = dados.map(d => d.dia);
  const minutos = dados.map(d => d.minutos);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌿 Gráfico Zen – Meditação da Semana</Text>
      {dados.length > 0 && (
        <BarChart
          data={{
            labels: dias,
            datasets: [{ data: minutos }],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          fromZero
          yAxisSuffix=" min"
          chartConfig={{
            backgroundGradientFrom: '#e0f7fa',
            backgroundGradientTo: '#80deea',
            color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
            labelColor: () => '#00695c',
            style: { borderRadius: 16 },
          }}
          style={styles.chart} yAxisLabel={''}        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  chart: { borderRadius: 16, marginVertical: 8 },
});