import React from 'react';
import { Brain } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 24, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500 blur-sm rounded-full opacity-50" />
        <Brain size={size} className="relative text-cyan-500" />
      </div>
      <span className="font-semibold text-lg">MindPad</span>
    </div>
  );
}