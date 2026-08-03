import type { Answers } from '../types';

export interface SavedSession {
  answers: Answers;
  savedAt: number;
}

const STORAGE_KEY = 'fbla-last-session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function saveSession(answers: Answers): void {
  try {
    const payload: SavedSession = { answers, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable (private browsing, quota) — session just won't persist.
  }
}

export function loadSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const { answers, savedAt } = parsed as Partial<SavedSession>;
    if (typeof answers !== 'object' || answers === null || typeof savedAt !== 'number') {
      return null;
    }
    if (Date.now() - savedAt > SESSION_TTL_MS) {
      clearSession();
      return null;
    }
    return { answers, savedAt };
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore — nothing to clear if storage is unavailable.
  }
}
