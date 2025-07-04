import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveSessionTime(seconds: number) {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const existing = await AsyncStorage.getItem(today);
  const total = existing ? parseInt(existing) + seconds : seconds;
  await AsyncStorage.setItem(today, total.toString());
}

export async function getAllMeditationData() {
  const keys = await AsyncStorage.getAllKeys();
  const filteredKeys = keys.filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)); // keys que parecem datas
  const data = await AsyncStorage.multiGet(filteredKeys);
  return data.map(([date, value]) => ({ date, seconds: Number(value) }));
}

export async function syncWithServer() {
  const data = await getAllMeditationData();
  await fetch('http://192.168.15.8:5000/meditacao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}