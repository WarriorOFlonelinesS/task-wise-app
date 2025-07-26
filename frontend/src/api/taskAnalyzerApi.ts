import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export async function taskAnalyze(id: string, token: string) {
  const response = await axios.get(`${API_URL}/ai-analyse/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
