import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ message, subMessage }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-[60vh] text-white/50"
      >
        <p>{message}</p>
        {subMessage && <p className="text-sm">{subMessage}</p>}
      </motion.div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;