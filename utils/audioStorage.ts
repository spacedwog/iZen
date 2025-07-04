import AsyncStorage from '@react-native-async-storage/async-storage';

type Audio = {
  title: string;
  url: string;
};

const AUDIO_STORAGE_KEY = '@audios';

export async function saveAudioLocally(audio: Audio) {
  const existing = await AsyncStorage.getItem(AUDIO_STORAGE_KEY);
  const audios: Audio[] = existing ? JSON.parse(existing) : [];
  audios.push(audio);
  await AsyncStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(audios));
}

export async function getSavedAudios(): Promise<Audio[]> {
  const stored = await AsyncStorage.getItem(AUDIO_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function syncAudiosWithServer() {
  const localAudios = await getSavedAudios();
  for (const audio of localAudios) {
    try {
      await fetch('http://192.168.15.8:5000/audios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(audio),
      });
    } catch (err) {
      console.error('Erro ao sincronizar áudio:', audio.title, err);
    }
  }
  // Após sincronizar, você pode limpar localmente se desejar:
  // await AsyncStorage.removeItem(AUDIO_STORAGE_KEY);
}