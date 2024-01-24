const axios = require('axios');

import MockAdapter from 'axios-mock-adapter';
import {
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addProduct,
} from '../src/components/Services/productsService'; 

const mockAxios = new MockAdapter(axios);

describe('getAllProducts', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch all products and return data on success', async () => {
    const responseData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, responseData);

    const result = await getAllProducts();

    expect(result).toEqual(responseData);
  });

  it('should throw an error on request failure', async () => {
    mockAxios.onGet('https://fakestoreapi.com/products').reply(500, { error: 'Internal Server Error' });

    try {
      await getAllProducts();
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.message).toBe('Request failed with status code 500');
    }
  });
});

describe('getProductDetails', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch product details and return data on success', async () => {
    const productId = 1;
    const responseData = { id: 1, name: 'Product 1' };
    mockAxios.onGet(`https://fakestoreapi.com/products/${productId}`).reply(200, responseData);

    const result = await getProductDetails(productId);

    expect(result).toEqual(responseData);
  });

  it('should throw an error on request failure', async () => {
    const productId = 1;
    mockAxios.onGet(`https://fakestoreapi.com/products/${productId}`).reply(404, { error: 'Not Found' });

    try {
      await getProductDetails(productId);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.message).toBe('Request failed with status code 404');
    }
  });
});

describe('updateProduct', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should update a product and return updated data on success', async () => {
    const productId = 1;
    const updatedData = { name: 'Updated Product 1' };
    const responseData = { id: 1, name: 'Updated Product 1' };

    mockAxios.onPatch(`https://fakestoreapi.com/products/${productId}`, updatedData).reply(200, responseData);

    const result = await updateProduct(productId, updatedData);

    expect(result).toEqual(responseData);
  });

  it('should throw an error on request failure', async () => {
    const productId = 1;
    const updatedData = { name: 'Updated Product 1' };

    mockAxios.onPatch(`https://fakestoreapi.com/products/${productId}`, updatedData).reply(500, {
      error: 'Internal Server Error',
    });

    try {
      await updateProduct(productId, updatedData);
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.message).toBe('Request failed with status code 500');
    }
  });
});

describe('deleteProduct', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should delete a product and return success on success', async () => {
    const productId = 1;

    mockAxios.onDelete(`https://fakestoreapi.com/products/${productId}`).reply(204, '');

    const result = await deleteProduct(productId);

    expect(result).toBeUndefined();
  });

  it('should throw an error on request failure', async () => {
    const productId = 1;

    mockAxios.onDelete(`https://fakestoreapi.com/products/${productId}`).reply(404, { error: 'Not Found' });

    try {
      await deleteProduct(productId);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.message).toBe('Request failed with status code 404');
    }
  });
});

describe('addProduct', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should add a product and return the added data on success', async () => {
    const product = { name: 'New Product' };
    const responseData = { id: 3, name: 'New Product' };

    mockAxios.onPost('https://fakestoreapi.com/products', product).reply(201, responseData);

    const result = await addProduct(product);

    expect(result).toEqual(responseData);
  });

  it('should throw an error on request failure', async () => {
    const product = { name: 'New Product' };

    mockAxios.onPost('https://fakestoreapi.com/products', product).reply(500, {
      error: 'Internal Server Error',
    });

    try {
      await addProduct(product);
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.message).toBe('Request failed with status code 500');
    }
  });
});
