import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Note } from '../types';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => void;
  onClose: () => void;
}

export default function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isSaveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  useEffect(() => {
    setSaveEnabled(title.trim() !== '' && content.trim() !== '');
  }, [title, content]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-gray-900 z-50 flex flex-col"
    >
      {/* Editor App Bar */}
      <header className="safe-top">
        <div className="h-14 px-2 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/10">
          <button
            onClick={onClose}
            className="p-2 rounded-full ripple flex items-center gap-1"
          >
            <ArrowLeft className="w-6 h-6 text-white/70" />
          </button>
          <button
            onClick={handleSave}
            disabled={!isSaveEnabled}
            className="px-4 py-1.5 rounded-full bg-cyan-500 text-white text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
          >
            Save
          </button>
        </div>
      </header>

      {/* Editor Content */}
      <div className="flex-1 native-scroll safe-bottom">
        <div className="p-4 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent text-xl font-medium text-white/90 placeholder-white/30 focus:outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note"
            className="w-full min-h-[calc(100vh-12rem)] bg-transparent text-white/70 placeholder-white/30 focus:outline-none resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}