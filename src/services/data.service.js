import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getData = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const addUserData = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const deleteData = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/api/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};