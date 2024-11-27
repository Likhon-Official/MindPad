import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  active?: boolean;
}

export default function IconButton({
  icon: Icon,
  active,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-full ripple ${
        active ? 'text-cyan-400' : 'text-white/70'
      } ${className}`}
      {...props}
    >
      <Icon className="w-6 h-6" />
    </motion.button>
  );
}