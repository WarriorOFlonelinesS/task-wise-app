import { createAction } from '@reduxjs/toolkit';
import { Profile } from './type';

export const getProfileRequest = createAction<{ id: string; token: string }>(
  'profile/getProfileRequest',
);

export const getProfileSuccess = createAction<{ id: string; token: string }>(
  'profile/getProfileRequest',
);

export const getProfileFailure = createAction<{ id: string; token: string }>(
  'profile/getProfileRequest',
);

export const updateProfileRequest = createAction<{
  id: string;
  token: string;
  name: string | null;
  avatarUrl: string | null;
}>('profile/updateProfileRequest');

export const updateProfileSuccess = createAction<Profile>('profile/updateProfileSuccess');

export const updateProfileFailure = createAction<{
  any;
}>('profile/updateProfileFailure');

export const deleteProfileRequest = createAction<{
  id: string;
  token: string;
}>('profile/deleteProfileRequest');

export const deleteProfileSuccess = createAction('profile/deleteProfileSuccess');

export const deleteProfileFailure = createAction<{
  any;
}>('profile/deleteProfileFailure');
