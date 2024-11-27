import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import useNoteStore from './useNoteStore';
import { createWelcomeNotes } from '../utils/welcomeNotes';

export default function useInitialLoad() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load notes
        const { value: notesValue } = await Preferences.get({ key: 'notes' });
        if (notesValue) {
          const savedNotes = JSON.parse(notesValue);
          useNoteStore.setState({ notes: savedNotes });
        } else {
          // First time user - add welcome notes
          const welcomeNotes = createWelcomeNotes();
          useNoteStore.setState({ notes: welcomeNotes });
          await Preferences.set({ key: 'notes', value: JSON.stringify(welcomeNotes) });

          // Add initial categories and tags
          const initialCategories = ['Getting Started'];
          const initialTags = ['welcome', 'tutorial', 'tips'];
          useNoteStore.setState({ categories: initialCategories, tags: initialTags });
          await Preferences.set({ key: 'categories', value: JSON.stringify(initialCategories) });
          await Preferences.set({ key: 'tags', value: JSON.stringify(initialTags) });
        }

        // Load categories
        const { value: categoriesValue } = await Preferences.get({ key: 'categories' });
        if (categoriesValue) {
          const savedCategories = JSON.parse(categoriesValue);
          useNoteStore.setState({ categories: savedCategories });
        }

        // Load tags
        const { value: tagsValue } = await Preferences.get({ key: 'tags' });
        if (tagsValue) {
          const savedTags = JSON.parse(tagsValue);
          useNoteStore.setState({ tags: savedTags });
        }

        // Simulate minimum loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return isLoading;
}