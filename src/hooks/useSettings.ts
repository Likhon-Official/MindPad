import { create } from 'zustand';
import { Settings } from '../types';
import { STORAGE_KEYS } from '../constants/config';
import { setData } from '../utils/storage';

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  sortBy: 'date',
  sortOrder: 'desc',
  fontSize: 'medium',
};

const useSettings = create<{
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}>((set) => ({
  settings: DEFAULT_SETTINGS,
  updateSettings: async (newSettings) => {
    set((state) => {
      const settings = { ...state.settings, ...newSettings };
      setData(STORAGE_KEYS.SETTINGS, settings);
      return { settings };
    });
  },
}));

export default useSettings;