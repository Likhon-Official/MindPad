export const APP_CONFIG = {
  name: 'MindPad',
  version: '1.0.0',
  description: 'Your digital thinking space',
  author: 'MindPad Team',
};

export const STORAGE_KEYS = {
  NOTES: 'notes',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  SETTINGS: 'settings',
};

export const ANIMATION_CONFIG = {
  spring: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 300,
  },
  fade: {
    duration: 0.2,
  },
};