import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './type';

const initialState: ProfileState = {
  profile: null,
  token: null,
  loading: false,
  error: null,
  message: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.loading = true;
    },
    getProfileSuccess(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.profile = action.payload;
      state.loading = false;
    },
    getProfileFailure(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    updateProfileRequest(
      state,
      action: PayloadAction<{
        token: string;
        id: string;
        name: string | null;
        avatarUrl: string | null;
      }>,
    ) {
      state.error = null;
    },
    updateProfileSuccess(
      state,
      action: PayloadAction<{
        profile: any;
      }>,
    ) {
      state.profile = action.payload;
    },
    updateProfileFailure(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    deleteProfileRequest(
      state,
      action: PayloadAction<{
        id: string;
        token: string;
      }>,
    ) {
      state.loading = true;
    },
    deleteProfileSuccess(state) {
      state.profile = null;
    },
    deleteProfileFailure(
      state,
      action: PayloadAction<{
        id: string;
        token: string;
      }>,
    ) {
      state.error = null;
    },
  },
});

export const {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
