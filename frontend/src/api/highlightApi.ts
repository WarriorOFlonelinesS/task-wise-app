import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export type SaveHighlightPayload = {
  taskId: string | number;
  selection: string;
  color: string;
  sourceTexty: string;
};

export async function postHighlight(data: SaveHighlightPayload, token: string) {
  const response = await axios.post(`${API_URL}/tasks/${data.taskId}/highlights`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getHighlightsForTask(taskId: string | number, token: string) {
  const response = await axios.get(`${API_URL}/tasks/${taskId}/highlights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteHighlight(taskId: string | number, highlightId: string, token: string) {
  const response = await axios.get(`${API_URL}/tasks/${taskId}/highlights/${highlightId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
