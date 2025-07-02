import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { saveSessionTime } from '../utils/storage';

export default function MeditarScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  async function startMeditation() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/natureza1.mp3'),
      { shouldPlay: true }
    );
    setSound(sound);
    const start = Date.now();
    setStartTime(start);
    const newTimer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    setTimer(newTimer);
  }

  async function stopMeditation() {
    if (sound) await sound.stopAsync();
    if (timer) clearInterval(timer);
    await saveSessionTime(elapsed); // salva tempo da sessão
    setElapsed(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{elapsed}s</Text>
      <Button title="Iniciar Meditação" onPress={startMeditation} />
      <Button title="Encerrar Meditação" onPress={stopMeditation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 48, marginBottom: 20 },
});