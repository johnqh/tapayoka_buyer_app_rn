describe('localStorage polyfill', () => {
  // Delete any existing localStorage so the polyfill guard triggers
  beforeAll(() => {
    delete (globalThis as any).localStorage;
  });

  it('creates localStorage when missing', () => {
    expect(globalThis.localStorage).toBeUndefined();
    require('../src/polyfills/localStorage');
    expect(globalThis.localStorage).toBeDefined();
  });

  it('provides getItem, setItem, removeItem', () => {
    const ls = globalThis.localStorage;
    expect(typeof ls.getItem).toBe('function');
    expect(typeof ls.setItem).toBe('function');
    expect(typeof ls.removeItem).toBe('function');
  });

  it('stores and retrieves values', () => {
    const ls = globalThis.localStorage;
    ls.setItem('test-key', 'test-value');
    expect(ls.getItem('test-key')).toBe('test-value');
  });

  it('returns null for missing keys', () => {
    expect(globalThis.localStorage.getItem('nonexistent')).toBeNull();
  });

  it('removes values', () => {
    const ls = globalThis.localStorage;
    ls.setItem('to-remove', 'value');
    ls.removeItem('to-remove');
    expect(ls.getItem('to-remove')).toBeNull();
  });
});
