/**
 * App constants
 */

export const APP_NAME = 'Tapayoka';

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Supported languages
export const SUPPORTED_LANGUAGES = [
  'en', 'ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'sv', 'th', 'uk', 'vi', 'zh', 'zh-Hant',
];

// Storage keys
export const STORAGE_KEYS = {
  LANGUAGE: '@tapayoka-buyer/language',
  SETTINGS: '@tapayoka-buyer/settings',
} as const;

// Tab names
export const TAB_NAMES = {
  SCAN: 'ScanTab',
  HISTORY: 'History',
  SETTINGS: 'Settings',
} as const;
