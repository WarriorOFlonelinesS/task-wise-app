import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://task-wise-app.online/api';


export async function login(credentials: { email: string; password: string }) {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if(credentials.remember){
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
  }
  return response.data;
}

export async function loginWithToken(token: string) {
  const response = await axios.post(`${API_URL}/loginwithtoken`, { token });
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await axios.post(`${API_URL}/register`, data);
  if(data.remember){
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
  }
  return response.data;
}

export async function logout(data: { token: string }) {
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
