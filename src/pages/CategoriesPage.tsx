import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AppBar from '../components/Layout/AppBar';
import useNoteStore from '../hooks/useNoteStore';

export default function CategoriesPage() {
  const { categories, addCategory, removeCategory } = useNoteStore();
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <AppBar onMenuClick={() => {}} onSearchClick={() => {}} />

      <div className="p-4 flex items-center gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category..."
          className="flex-1 bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddCategory}
          className="p-2 bg-cyan-500 rounded-lg"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="p-4 space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3"
          >
            <span>{category}</span>
            <button
              onClick={() => removeCategory(category)}
              className="p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}