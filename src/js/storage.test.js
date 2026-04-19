import Storage from './storage.js';

describe('Storage 类测试', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getProducts', () => {
    test('当 localStorage 为空时，应该返回空数组', () => {
      const products = Storage.getProducts;
      expect(products).toEqual([]);
    });

    test('当 localStorage 有数据时，应该返回解析后的产品数组', () => {
      const mockProducts = [
        { id: 1, name: '产品A', price: 100 },
        { id: 2, name: '产品B', price: 200 }
      ];
      localStorage.setItem('products', JSON.stringify(mockProducts));
      
      const products = Storage.getProducts;
      expect(products).toEqual(mockProducts);
    });
  });

  describe('getCategories', () => {
    test('当 localStorage 为空时，应该返回空数组', () => {
      const categories = Storage.getCategories();
      expect(categories).toEqual([]);
    });

    test('当 localStorage 有数据时，应该返回解析后的分类数组', () => {
      const mockCategories = ['电子产品', '服装', '食品'];
      localStorage.setItem('categories', JSON.stringify(mockCategories));
      
      const categories = Storage.getCategories();
      expect(categories).toEqual(mockCategories);
    });
  });

  describe('saveProducts', () => {
    test('应该正确保存产品数组到 localStorage', () => {
      const productsToSave = [
        { id: 1, name: '产品A' },
        { id: 2, name: '产品B' }
      ];
      
      Storage.saveProducts(productsToSave);
      
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      expect(savedProducts).toEqual(productsToSave);
    });

    test('保存空数组应该正确存储', () => {
      Storage.saveProducts([]);
      
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      expect(savedProducts).toEqual([]);
    });
  });

  describe('saveCategories', () => {
    test('应该正确保存分类数组到 localStorage', () => {
      const categoriesToSave = ['分类1', '分类2', '分类3'];
      
      Storage.saveCategories(categoriesToSave);
      
      const savedCategories = JSON.parse(localStorage.getItem('categories'));
      expect(savedCategories).toEqual(categoriesToSave);
    });
  });

  describe('removeProduct', () => {
    test('应该正确删除指定 ID 的产品', () => {
      const initialProducts = [
        { id: 1, name: '产品A' },
        { id: 2, name: '产品B' },
        { id: 3, name: '产品C' }
      ];
      Storage.saveProducts(initialProducts);
      
      Storage.removeProduct(2);
      
      const remainingProducts = Storage.getProducts;
      expect(remainingProducts).toEqual([
        { id: 1, name: '产品A' },
        { id: 3, name: '产品C' }
      ]);
    });

    test('删除不存在的 ID 时，数组应该保持不变', () => {
      const initialProducts = [
        { id: 1, name: '产品A' },
        { id: 2, name: '产品B' }
      ];
      Storage.saveProducts(initialProducts);
      
      Storage.removeProduct(999);
      
      const remainingProducts = Storage.getProducts;
      expect(remainingProducts).toEqual(initialProducts);
    });

    test('当只有一个产品时删除它，应该返回空数组', () => {
      const initialProducts = [{ id: 1, name: '唯一产品' }];
      Storage.saveProducts(initialProducts);
      
      Storage.removeProduct(1);
      
      const remainingProducts = Storage.getProducts;
      expect(remainingProducts).toEqual([]);
    });
  });
});
