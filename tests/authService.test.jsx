const axios = require('axios');

import MockAdapter from 'axios-mock-adapter';
import { login } from '../src/components/Services/authService';


const mockAxios = new MockAdapter(axios);

describe('login function', () => {
  afterEach(() => {
    mockAxios.reset(); 
  });

  it('should send a POST request to /auth/login with user data and return data on success', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    const responseData = { token: 'yourAuthToken' };
    mockAxios.onPost('/auth/login').reply(200, responseData);

    const result = await login(userData);

    expect(result).toEqual(responseData);
  });

  it('should throw an error on request failure', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    mockAxios.onPost('/auth/login').reply(500, { error: 'Internal Server Error' });

    try {
      await login(userData);
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.message).toBe('Request failed with status code 500');
    }
  });
});
