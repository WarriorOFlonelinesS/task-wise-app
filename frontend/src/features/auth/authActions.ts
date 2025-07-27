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

export const loginFailure = createAction<string>('auth/loginFailure');

export const registerRequest = createAction<{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}>('auth/registerRequest');

export const registerSuccess = createAction<{
  user: any;
  token: string;
}>('auth/registerSuccess');

export const registerFailure = createAction<string>('auth/registerFailure');

export const logoutRequest = createAction<{ token: string }>('auth/logoutRequest');

export const logoutSuccess = createAction<{
  user: any;
  token: string;
}>('auth/logoutSuccess');

export const logoutFailure = createAction<string>('auth/logoutFailure');
