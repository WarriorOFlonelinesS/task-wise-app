import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as profileApi from '../../api/profileApi';
import {
  deleteProfileFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  updateProfileFailure,
  updateProfileRequest,
} from './profileSlice';
import { handleErrors } from '../../helpers/handleErrors';

function* getProfileSaga(action: ReturnType<typeof getProfileRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(getProfileFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(profileApi.getProfile, action.payload, token);
    yield put(getProfileSuccess(data));
  } catch (e: any) {
    yield put(getProfileFailure(handleErrors(e)));
  }
}

function* updateProfileSaga(action: ReturnType<typeof getProfileRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(updateProfileFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(profileApi.updateProfile, action.payload, token);
    yield put(getProfileSuccess(data));
  } catch (e: any) {
    yield put(getProfileFailure(handleErrors(e)));
  }
}

function* deleteProfileSaga(action: ReturnType<typeof getProfileRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(deleteProfileFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(profileApi.delteProfile, action.payload, token);
    yield put(deleteProfileSuccess(data));
  } catch (e: any) {
    yield put(deleteProfileFailure(handleErrors(e)));
  }
}

export function* profileSaga() {
  yield takeEvery(getProfileRequest.type, getProfileSaga);
  yield takeEvery(updateProfileRequest.type, updateProfileSaga);
  yield takeEvery(deleteProfileRequest.type, deleteProfileSaga);
}
