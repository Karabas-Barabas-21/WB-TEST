import axios from 'axios';

const API_BASE_URL = 'https://68949323be3700414e13b888.mockapi.io/api/v1'; // Убедитесь, что это правильный URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});