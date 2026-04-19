describe('Storage 模块测试', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('localStorage 应该可以正常读写', () => {
    localStorage.setItem('testKey', 'testValue');
    expect(localStorage.getItem('testKey')).toBe('testValue');
  });

  test('localStorage 删除功能正常', () => {
    localStorage.setItem('testKey', 'testValue');
    localStorage.removeItem('testKey');
    expect(localStorage.getItem('testKey')).toBeNull();
  });
});
