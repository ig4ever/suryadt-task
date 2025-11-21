import apiClient from '../config/api';

export const getItems = async (page = 1, limit = 10, search = '') => {
  const params = { page, limit };
  if (search) params.search = search;

  const response = await apiClient.get('/items', { params });
  return response.data;
};

export const getItemById = async (id) => {
  const response = await apiClient.get(`/items/${id}`);
  return response.data;
};

export const createItem = async (data) => {
  const response = await apiClient.post('/items', data);
  return response.data;
};

export const updateItem = async (id, data) => {
  const response = await apiClient.put(`/items/${id}`, data);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await apiClient.delete(`/items/${id}`);
  return response.data;
};
