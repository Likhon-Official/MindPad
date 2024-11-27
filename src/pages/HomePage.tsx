import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppBar from '../components/Layout/AppBar';
import Drawer from '../components/Layout/Drawer';
import NoteList from '../components/Notes/NoteList';
import NoteEditor from '../components/Notes/NoteEditor';
import SearchBar from '../components/UI/SearchBar';
import useNoteStore from '../hooks/useNoteStore';
import { Note } from '../types';

export default function HomePage() {
  const { notes, addNote, updateNote, deleteNote } = useNoteStore();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setEditorOpen] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      !note.isArchived &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = (noteData: Partial<Note>) => {
    if (selectedNote) {
      updateNote(selectedNote.id, noteData);
    } else {
      addNote(noteData as Omit<Note, 'id' | 'createdAt' | 'updatedAt'>);
    }
    setSelectedNote(null);
    setEditorOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <AppBar
        onMenuClick={() => setDrawerOpen(true)}
        onSearchClick={() => setSearchVisible(true)}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
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
        notes={filteredNotes}
        onEdit={(note) => {
          setSelectedNote(note);
          setEditorOpen(true);
        }}
        onDelete={deleteNote}
        searchQuery={searchQuery}
      />

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setSelectedNote(null);
          setEditorOpen(true);
        }}
        className="fixed right-4 bottom-4 safe-bottom w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            note={selectedNote || undefined}
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