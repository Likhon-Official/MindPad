import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10"
    >
      <div
        onClick={() => onEdit(note)}
        className="ripple p-4 active:bg-white/5"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium text-white/90 mb-1">
            {note.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 -mr-1 rounded-full ripple"
          >
            <MoreVertical className="w-5 h-5 text-white/50" />
          </button>
        </div>
        <p className="text-sm text-white/60 line-clamp-2 mb-2">{note.content}</p>
        <p className="text-xs text-white/40">
          {formatDistanceToNow(new Date(note.updatedAt))} ago
        </p>
      </div>

      {/* Context Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setShowMenu(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-8 right-2 z-30 min-w-[140px] py-1 rounded-lg bg-gray-800 border border-white/10 shadow-xl"
          >
            <button
              onClick={() => {
                onEdit(note);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-sm text-left text-white/90 hover:bg-white/5"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(note.id);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-white/5"
            >
              Delete
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}