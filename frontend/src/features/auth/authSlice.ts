import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './type';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.user = null;
    },

    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  logoutRequest,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
