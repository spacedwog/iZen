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
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: 1,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/natureza1.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      await sound.setVolumeAsync(1.0);
      setSound(sound);

      const start = Date.now();
      setStartTime(start);
      const newTimer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - start) / 1000));
      }, 1000);
      setTimer(newTimer);
    } catch (error) {
      console.error('Erro ao iniciar a meditação:', error);
    }
  }

  async function stopMeditation() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    if (elapsed > 0) {
      await saveSessionTime(elapsed);
    }
    setElapsed(0);
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{elapsed}s</Text>
      <Button title="Iniciar Meditação" onPress={startMeditation} disabled={!!sound} />
      <Button title="Encerrar Meditação" onPress={stopMeditation} disabled={!sound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 48, marginBottom: 20 },
});