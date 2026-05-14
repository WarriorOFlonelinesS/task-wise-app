import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export async function getTasks(token: string) {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postTasks(data: { title: string; description: string }, token: string) {
  const response = await axios.post(`${API_URL}/tasks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteTasks(id: string, token: string) {
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateTasks(
  data: { id: string; title: string; description: string; status: string },
  token: string,
) {
  const response = await axios.put(
    `${API_URL}/tasks/${data.id}`,
    { title: data.title, description: data.description, status: data.status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
