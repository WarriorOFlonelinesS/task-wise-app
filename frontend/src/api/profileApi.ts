import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export async function getProfile(id: string, token: string) {
  const response = await axios.get(`${API_URL}/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateProfile(
  id: string,
  token: string,
  avatarUrl: string = '',
  name: string = '',
) {
  const response = await axios.put(
    `${API_URL}/profile/${id}`,
    { avatarUrl, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function delteProfile(id: string, token: string) {
  const response = await axios.delete(`${API_URL}/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
