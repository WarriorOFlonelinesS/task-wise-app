import { createSlice, PlayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

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
        password_confirmation: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.loading = true;
      state.error = null;
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
        password_confirmation: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.loading = true;
      state.error = null;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.loading = true;
      state.error = null;
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
