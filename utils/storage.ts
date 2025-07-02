import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export async function saveSessionTime(seconds: number) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const existing = await AsyncStorage.getItem(today);
  const total = existing ? parseInt(existing) + seconds : seconds;
  await AsyncStorage.setItem(today, total.toString());
}

export async function getAllMeditationData() {
  const keys = await AsyncStorage.getAllKeys();
  const data = await AsyncStorage.multiGet(keys);
  return data.map(([date, value]) => ({ date, seconds: Number(value) }));
}