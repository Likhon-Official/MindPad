import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ArrowLeft } from 'lucide-react';
import Logo from '../UI/Logo';

interface AppBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function AppBar({ onMenuClick, onSearchClick }: AppBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isRoot = location.pathname === '/';

  return (
    <header className="safe-top z-10">
      <div className="px-4 h-14 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          {isRoot ? (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 ripple rounded-full"
            >
              <Menu className="w-6 h-6 text-white/70" />
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 ripple rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-white/70" />
            </button>
          )}
          {isRoot ? (
            <Logo />
          ) : (
            <h1 className="text-lg font-medium capitalize">
              {location.pathname.slice(1)}
            </h1>
          )}
        </div>
        <button
          onClick={onSearchClick}
          className="p-2 ripple rounded-full"
        >
          <Search className="w-6 h-6 text-white/70" />
        </button>
      </div>
    </header>
  );
}