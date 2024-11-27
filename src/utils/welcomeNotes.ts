import { nanoid } from 'nanoid';
import type { Note } from '../types';

export const createWelcomeNotes = (): Note[] => {
  const now = new Date().toISOString();
  
  return [
    {
      id: nanoid(),
      title: '👋 Welcome to MindPad!',
      content: 
`Welcome to MindPad, your new digital thinking space! 

Here are some key features to get you started:
• Create and organize notes with ease
• Add tags and categories for better organization
• Mark important notes as favorites
• Archive notes you don't need right now
• Lock sensitive notes for privacy
• Dark mode support for comfortable writing

Tap the + button in the bottom right to create your first note!`,
      createdAt: now,
      updatedAt: now,
      isFavorite: true,
      isArchived: false,
      isLocked: false,
      tags: ['welcome', 'tutorial'],
      category: 'Getting Started'
    },
    {
      id: nanoid(),
      title: '✨ Pro Tips',
      content:
`Here are some pro tips to make the most of MindPad:

1. Use tags to create flexible groupings
2. Categories help with broader organization
3. Star important notes for quick access
4. Archive notes instead of deleting them
5. Use the search feature to find notes quickly
6. Share notes directly from the editor
7. Lock sensitive information with one tap

Happy note-taking! 📝`,
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
      isArchived: false,
      isLocked: false,
      tags: ['tips', 'tutorial'],
      category: 'Getting Started'
    }
  ];
};