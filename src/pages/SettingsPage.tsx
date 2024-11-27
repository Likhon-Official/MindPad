import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import AppBar from '../components/Layout/AppBar';
import useSettings from '../hooks/useSettings';
import { Settings } from '../types';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const sortByOptions = [
    { value: 'title', label: 'Title' },
    { value: 'date', label: 'Date' },
    { value: 'category', label: 'Category' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <AppBar onMenuClick={() => {}} onSearchClick={() => {}} />

      <div className="p-4 space-y-6">
        <section>
          <h2 className="text-lg font-medium mb-3">Theme</h2>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => updateSettings({ theme: value as Settings['theme'] })}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                  settings.theme === value
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Sort Notes By</h2>
          <div className="space-y-2">
            {sortByOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateSettings({ sortBy: value as Settings['sortBy'] })}
                className={`w-full p-3 text-left rounded-lg ${
                  settings.sortBy === value
                    ? 'bg-cyan-500'
                    : 'bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Font Size</h2>
          <div className="space-y-2">
            {fontSizeOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateSettings({ fontSize: value as Settings['fontSize'] })}
                className={`w-full p-3 text-left rounded-lg ${
                  settings.fontSize === value
                    ? 'bg-cyan-500'
                    : 'bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}