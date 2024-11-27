import { Preferences } from '@capacitor/preferences';
import { STORAGE_KEYS } from '../constants/config';

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return null;
  }
}

export async function setData<T>(key: string, data: T): Promise<void> {
  try {
    await Preferences.set({
      key,
      value: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Error setting data for key ${key}:`, error);
  }
}