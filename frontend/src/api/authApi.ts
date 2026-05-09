import axios from 'axios';
<<<<<<< HEAD
=======
import Cookies from 'js-cookie';
>>>>>>> frontend/profile

const API_URL = 'http://localhost:8000/api';

export async function login(credentials: { email: string; password: string }) {
  const response = await axios.post(`${API_URL}/login`, credentials);
<<<<<<< HEAD
=======
  if (credentials.remember) {
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
  }
  return response.data;
}

export async function loginWithToken(token: string) {
  const response = await axios.post(`${API_URL}/loginwithtoken`, { token });
>>>>>>> frontend/profile
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await axios.post(`${API_URL}/register`, data);
<<<<<<< HEAD
  return response.data;
}

export async function logout(token: string) {
=======
  if (data.remember) {
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
  }
  return response.data;
}

export async function logout(data: { token: string }) {
>>>>>>> frontend/profile
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
<<<<<<< HEAD
        Authorization: `Bearer ${token}`,
=======
        Authorization: `Bearer ${data.token}`,
>>>>>>> frontend/profile
      },
    },
  );
  return response.data;
}
