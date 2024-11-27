import { Note } from '../types';

export function sortNotes(notes: Note[], sortBy: string, sortOrder: 'asc' | 'desc'): Note[] {
  return [...notes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'category':
        comparison = (a.category || '').localeCompare(b.category || '');
        break;
      case 'date':
      default:
        comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export function filterNotes(notes: Note[], query: string): Note[] {
  const searchTerm = query.toLowerCase();
  return notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm) ||
      note.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      note.category?.toLowerCase().includes(searchTerm)
  );
}