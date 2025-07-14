import * as authApi from '../../api/authApi';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  registerSuccess,
  loginFailure,
  registerFailure,
  loginRequest,
  registerRequest,
  logoutRequest,
} from './authSlice';

function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const data = yield call(authApi.login, action.payload);

    yield put(loginSuccess(data));
  } catch (e: any) {
    yield put(loginFailure(e.message || 'Login failed'));
  }
}

function* registerSaga(action: ReturnType<typeof registerRequest>) {
  try {
    const data = yield call(authApi.register, action.payload);
    yield put(registerSuccess(data));
  } catch (e: any) {
    yield put(registerFailure(e.message || 'Register failed'));
  }
}

function* logoutSaga(action: ReturnType<typeof logoutRequest>) {
  try {
    const data = yield call(authApi.logout, action.payload);
    yield put(logoutSuccess());
  } catch (e: any) {
    yield put(logoutFailure(e.message || 'Logout failed'));
  }
}

export function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(logoutRequest.type, logoutSaga);
}
