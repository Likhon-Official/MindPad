import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Note } from '../../types';
import NoteCard from './NoteCard';
import EmptyState from '../UI/EmptyState';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

export default function NoteList({
  notes,
  onEdit,
  onDelete,
  searchQuery,
}: NoteListProps) {
  return (
    <main className="flex-1 native-scroll safe-bottom">
      <div className="p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {notes.length === 0 ? (
            <EmptyState
              message={searchQuery ? 'No notes found' : 'No notes yet'}
              subMessage={!searchQuery && 'Tap + to create your first note'}
            />
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}