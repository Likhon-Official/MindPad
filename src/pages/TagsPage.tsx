import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AppBar from '../components/Layout/AppBar';
import useNoteStore from '../hooks/useNoteStore';

export default function TagsPage() {
  const { tags, addTag, removeTag } = useNoteStore();
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <AppBar onMenuClick={() => {}} onSearchClick={() => {}} />

      <div className="p-4 flex items-center gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add new tag..."
          className="flex-1 bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddTag}
          className="p-2 bg-cyan-500 rounded-lg"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="p-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}