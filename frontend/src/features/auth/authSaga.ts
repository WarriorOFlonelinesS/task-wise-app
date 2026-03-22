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
  loginRequestWithToken,
} from './authSlice';
import { handleErrors } from '../../helpers/handleErrors';

function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const data = yield call(authApi.login, action.payload);
    yield put(loginSuccess(data));
  } catch (e: any) {
    yield put(loginFailure(handleErrors(e)));
  }
}

function* loginWithTokenSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const data = yield call(authApi.loginWithToken, action.payload);
    yield put(loginSuccess(data));
  } catch (e: any) {
    yield put(loginFailure(handleErrors(e)));
  }
}

function* registerSaga(action: ReturnType<typeof registerRequest>) {
  try {
    const data = yield call(authApi.register, action.payload);
    yield put(registerSuccess(data));
  } catch (e: any) {
    yield put(registerFailure(handleErrors(e)));
  }
}

function* logoutSaga(action: ReturnType<typeof logoutRequest>) {
  try {
    yield call(authApi.logout, action.payload);
    yield put(logoutSuccess('Logout successful'));
  } catch (e: any) {
    yield put(logoutFailure(handleErrors(e)));
  }
}

export function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(loginRequestWithToken.type, loginWithTokenSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(logoutRequest.type, logoutSaga);
}
