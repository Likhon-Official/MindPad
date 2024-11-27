import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Star,
  Archive,
  Tag,
  FolderOpen,
  X,
} from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Star, label: 'Favorites', path: '/favorites' },
    { icon: Archive, label: 'Archive', path: '/archive' },
    { icon: Tag, label: 'Tags', path: '/tags' },
    { icon: FolderOpen, label: 'Categories', path: '/categories' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30 }}
        className="fixed top-0 left-0 h-full w-72 bg-gray-900 z-50 safe-top safe-bottom"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full ripple"
          >
            <X className="w-6 h-6 text-white/70" />
          </button>
        </div>
        <nav className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>
    </>
  );
}