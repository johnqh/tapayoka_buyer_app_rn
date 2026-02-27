import { APP_NAME, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, STORAGE_KEYS, TAB_NAMES } from '../src/config/constants';

describe('constants', () => {
  it('exports app name', () => {
    expect(APP_NAME).toBe('Tapayoka');
  });

  it('has English as default language', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('supports multiple languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(SUPPORTED_LANGUAGES).toContain('ja');
    expect(SUPPORTED_LANGUAGES).toContain('zh');
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThanOrEqual(16);
  });

  it('has storage keys', () => {
    expect(STORAGE_KEYS.LANGUAGE).toBe('@tapayoka-buyer/language');
    expect(STORAGE_KEYS.SETTINGS).toBe('@tapayoka-buyer/settings');
  });

  it('has tab names', () => {
    expect(TAB_NAMES.SCAN).toBe('ScanTab');
    expect(TAB_NAMES.HISTORY).toBe('History');
    expect(TAB_NAMES.SETTINGS).toBe('Settings');
  });
});
