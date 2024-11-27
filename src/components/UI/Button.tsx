import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  isLoading,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'ripple disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'px-4 py-1.5 rounded-full bg-cyan-500 text-white text-sm font-medium',
    secondary: 'px-4 py-1.5 rounded-full bg-white/10 text-white text-sm',
    icon: 'p-2 rounded-full text-white/70 hover:bg-white/10',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-6 h-6" />}
      {children}
    </motion.button>
  );
}