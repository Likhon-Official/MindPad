import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getCurrentISOString(): string {
  return new Date().toISOString();
}