import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction<{
  name: string;
  email: string;
  password: string;
}>('auth/loginRequest');

export const loginSuccess = createAction<{
  user: any;
  token: string;
}>('auth/loginSuccess');

export const loginFailure = createAction<string>('auth/loginSuccess');

export const registerRequest = createAction<{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}>('auth/registerRequest');

export const registerSuccess = createAction<{
  user: any;
  token: string;
}>('auth/loginSuccess');

export const registerFailure = createAction<string>('auth/loginSuccess');

export const logoutRequest = createAction<{ token: string }>('auth/logoutRequest');

export const logoutSuccess = createAction<{
  user: any;
  token: string;
}>('auth/loginSuccess');

export const logoutFailure = createAction<string>('auth/loginSuccess');
