import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Note, NoteStore } from '../types';
import { STORAGE_KEYS } from '../constants/config';
import { setData } from '../utils/storage';
import { getCurrentISOString } from '../utils/date';

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  categories: [],
  tags: [],

  addNote: (note) => {
    const newNote = {
      ...note,
      id: nanoid(),
      createdAt: getCurrentISOString(),
      updatedAt: getCurrentISOString(),
      isFavorite: false,
      isArchived: false,
      isLocked: false,
    };
    set((state) => {
      const notes = [...state.notes, newNote];
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },

  updateNote: (id, updatedNote) => {
    set((state) => {
      const notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedNote, updatedAt: getCurrentISOString() }
          : note
      );
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },

  deleteNote: (id) => {
    set((state) => {
      const notes = state.notes.filter((note) => note.id !== id);
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },

  addCategory: (category) => {
    set((state) => {
      const categories = [...state.categories, category];
      setData(STORAGE_KEYS.CATEGORIES, categories);
      return { categories };
    });
  },

  removeCategory: (category) => {
    set((state) => {
      const categories = state.categories.filter((c) => c !== category);
      setData(STORAGE_KEYS.CATEGORIES, categories);
      return { categories };
    });
  },

  addTag: (tag) => {
    set((state) => {
      const tags = [...state.tags, tag];
      setData(STORAGE_KEYS.TAGS, tags);
      return { tags };
    });
  },

  removeTag: (tag) => {
    set((state) => {
      const tags = state.tags.filter((t) => t !== tag);
      setData(STORAGE_KEYS.TAGS, tags);
      return { tags };
    });
  },

  toggleFavorite: (id) => {
    set((state) => {
      const notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      );
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },

  toggleArchive: (id) => {
    set((state) => {
      const notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, isArchived: !note.isArchived }
          : note
      );
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },

  toggleLock: (id) => {
    set((state) => {
      const notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, isLocked: !note.isLocked }
          : note
      );
      setData(STORAGE_KEYS.NOTES, notes);
      return { notes };
    });
  },
}));

export default useNoteStore;