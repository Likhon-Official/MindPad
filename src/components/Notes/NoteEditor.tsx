import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Archive, Trash2, Tag, FolderOpen, Share2 } from 'lucide-react';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Note } from '../../types';
import useNoteStore from '../../hooks/useNoteStore';
import TagSelector from './TagSelector';
import CategorySelector from './CategorySelector';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function NoteEditor({ note, onSave, onClose, onDelete }: NoteEditorProps) {
  const { tags, categories, toggleFavorite, toggleArchive } = useNoteStore();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);
  const [selectedCategory, setSelectedCategory] = useState(note?.category || '');
  const [isTagSelectorOpen, setTagSelectorOpen] = useState(false);
  const [isCategorySelectorOpen, setCategorySelectorOpen] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    setSaveEnabled(title.trim() !== '' && content.trim() !== '');
  }, [title, content]);

  const handleSave = async () => {
    if (!isSaveEnabled) return;
    await Haptics.impact({ style: ImpactStyle.Light });
    onSave({
      title,
      content,
      tags: selectedTags,
      category: selectedCategory,
    });
  };

  const handleShare = async () => {
    await Share.share({
      title: title,
      text: content,
      dialogTitle: 'Share Note',
    });
  };

  const handleToggleFavorite = async () => {
    if (note) {
      await Haptics.impact({ style: ImpactStyle.Light });
      toggleFavorite(note.id);
    }
  };

  const handleToggleArchive = async () => {
    if (note) {
      await Haptics.impact({ style: ImpactStyle.Light });
      toggleArchive(note.id);
    }
  };

  const handleDelete = async () => {
    if (note && onDelete) {
      await Haptics.impact({ style: ImpactStyle.Light });
      onDelete(note.id);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-gray-900 z-50 flex flex-col"
    >
      <header className="safe-top">
        <div className="h-14 px-2 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/10">
          <button
            onClick={onClose}
            className="p-2 rounded-full ripple flex items-center gap-1"
          >
            <ArrowLeft className="w-6 h-6 text-white/70" />
          </button>
          <div className="flex items-center gap-2">
            {note && (
              <>
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 rounded-full ripple"
                >
                  <Star
                    className={`w-6 h-6 ${
                      note.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-white/70'
                    }`}
                  />
                </button>
                <button
                  onClick={handleToggleArchive}
                  className="p-2 rounded-full ripple"
                >
                  <Archive
                    className={`w-6 h-6 ${
                      note.isArchived ? 'text-cyan-400' : 'text-white/70'
                    }`}
                  />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-full ripple"
                >
                  <Trash2 className="w-6 h-6 text-red-400" />
                </button>
              </>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-full ripple"
            >
              <Share2 className="w-6 h-6 text-white/70" />
            </button>
            <button
              onClick={handleSave}
              disabled={!isSaveEnabled}
              className="px-4 py-1.5 rounded-full bg-cyan-500 text-white text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 native-scroll safe-bottom">
        <div className="p-4 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent text-xl font-medium text-white/90 placeholder-white/30 focus:outline-none"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTagSelectorOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-sm"
            >
              <Tag className="w-4 h-4" />
              <span>{selectedTags.length ? `${selectedTags.length} tags` : 'Add tags'}</span>
            </button>
            <button
              onClick={() => setCategorySelectorOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-sm"
            >
              <FolderOpen className="w-4 h-4" />
              <span>{selectedCategory || 'Add category'}</span>
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note"
            className="w-full min-h-[calc(100vh-16rem)] bg-transparent text-white/70 placeholder-white/30 focus:outline-none resize-none"
          />
        </div>
      </div>

      <TagSelector
        isOpen={isTagSelectorOpen}
        onClose={() => setTagSelectorOpen(false)}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        availableTags={tags}
      />

      <CategorySelector
        isOpen={isCategorySelectorOpen}
        onClose={() => setCategorySelectorOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availableCategories={categories}
      />
    </motion.div>
  );
}