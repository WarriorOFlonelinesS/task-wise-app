import * as authApi from '../../api/authApi';
import { all, call, put, takeEvery } from 'redux-saga/effects';
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

function* loginSaga(action) {
  try {
    const data = yield call(authApi.login, action.payload);
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginFailure(e.message || 'Login failed'));
  }
}

function* registerSaga(action) {
  try {
    const data = yield call(authApi.register, action.payload);
    yield put(registerSuccess(data));
  } catch (e) {
    yield put(registerFailure(e.message || 'Login failed'));
  }
}

function* logoutSaga(action) {
  try {
    const data = yield call(authApi.login, action.payload);
    yield put(logoutSuccess(data));
  } catch (e) {
    yield put(logoutFailure(e.message || 'Logout failed'));
  }
}

export function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(logoutRequest.type, logoutSaga);
}
