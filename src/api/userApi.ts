import { api } from './api';
import { IUser } from '../types/userTypes';


interface ApiResponse<T> {
  data: T;
  total?: number;
}

export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/Users', { 
      params: { page, limit }
    });
    return {
      data: response.data,
      total: response.headers['x-total-count'] || response.data.length
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<IUser> => {
  try {
    const response = await api.get(`/Users/${id}`);
    if (!response.data) {
      throw new Error('User not found');
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export const createUser = async (user: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> => {
  try {
    const response = await api.post('/Users', user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await api.put(`/Users/${user.id}`, user);
    if (!response.data) {
      throw new Error('Failed to update user');
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${user.id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/Users/${id}`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};