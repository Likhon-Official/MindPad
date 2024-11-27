import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CategorySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableCategories: string[];
}

export default function CategorySelector({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  availableCategories,
}: CategorySelectorProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-x-0 bottom-0 z-50 bg-gray-900 rounded-t-2xl safe-bottom"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Select Category</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onCategoryChange('');
                    onClose();
                  }}
                  className={`w-full p-3 text-left rounded-lg ${
                    !selectedCategory ? 'bg-cyan-500' : 'bg-white/5'
                  }`}
                >
                  No Category
                </button>
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      onClose();
                    }}
                    className={`w-full p-3 text-left rounded-lg ${
                      selectedCategory === category ? 'bg-cyan-500' : 'bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {availableCategories.length === 0 && (
                  <p className="text-white/50 text-sm">No categories available</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}