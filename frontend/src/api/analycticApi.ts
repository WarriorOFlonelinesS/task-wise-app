import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export async function getTasksAnalitics(token: string) {
  const response = await axios.get(`${API_URL}/tasks-analytic`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function taskAnalyze(id: string, token: string) {
  const response = await axios.get(`${API_URL}/tasks-analytic/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
