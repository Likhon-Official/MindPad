import React from 'react';

interface SearchBarProps {
  isVisible: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function SearchBar({
  isVisible,
  value,
  onChange,
  onClose,
}: SearchBarProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-x-0 top-0 safe-top z-20">
      <div className="flex items-center bg-black/30 backdrop-blur-xl border-b border-white/10">
        <input
          autoFocus
          type="text"
          placeholder="Search notes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-4 h-14 text-white/90 placeholder-white/50 focus:outline-none"
        />
        <button
          onClick={onClose}
          className="px-4 py-2 text-cyan-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}