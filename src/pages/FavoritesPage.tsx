import React, { useState } from 'react';
import AppBar from '../components/Layout/AppBar';
import NoteList from '../components/Notes/NoteList';
import NoteEditor from '../components/Notes/NoteEditor';
import SearchBar from '../components/UI/SearchBar';
import useNoteStore from '../hooks/useNoteStore';
import { Note } from '../types';
import { AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const { notes, updateNote, deleteNote } = useNoteStore();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setEditorOpen] = useState(false);

  const favoriteNotes = notes.filter(
    (note) =>
      note.isFavorite &&
      !note.isArchived &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = (noteData: Partial<Note>) => {
    if (selectedNote) {
      updateNote(selectedNote.id, noteData);
    }
    setSelectedNote(null);
    setEditorOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <AppBar
        onMenuClick={() => {}}
        onSearchClick={() => setSearchVisible(true)}
      />

      <SearchBar
        isVisible={isSearchVisible}
        value={searchQuery}
        onChange={setSearchQuery}
        onClose={() => {
          setSearchQuery('');
          setSearchVisible(false);
        }}
      />

      <NoteList
        notes={favoriteNotes}
        onEdit={(note) => {
          setSelectedNote(note);
          setEditorOpen(true);
        }}
        onDelete={deleteNote}
        searchQuery={searchQuery}
      />

      <AnimatePresence>
        {isEditorOpen && selectedNote && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onDelete={deleteNote}
            onClose={() => {
              setSelectedNote(null);
              setEditorOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}