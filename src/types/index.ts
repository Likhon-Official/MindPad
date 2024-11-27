export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
  tags?: string[];
  isFavorite?: boolean;
  isArchived?: boolean;
  isLocked?: boolean;
  category?: string;
}

export interface NoteStore {
  notes: Note[];
  categories: string[];
  tags: string[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  toggleFavorite: (id: string) => void;
  toggleArchive: (id: string) => void;
  toggleLock: (id: string) => void;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  sortBy: 'title' | 'date' | 'category';
  sortOrder: 'asc' | 'desc';
  fontSize: 'small' | 'medium' | 'large';
}