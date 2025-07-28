import axios from 'axios';

const API_URL = 'https://task-wise-app.onrender.com/api/';

export async function login(credentials: { email: string; password: string }) {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
}

export async function logout(data:{token:string}) {

  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
  return response.data;
}
