import * as taskAnalyzerApi from '../../api/taskAnalyzerApi';
import { call, put, takeEvery } from 'redux-saga/effects';
import { taskAnalyzeSuccess, taskAnalyzeFailure, taskAnalyzeRequest } from './taskAnalyzerSlice';

function* taskAnalyzeSaga(action: ReturnType<typeof taskAnalyzeRequest>) {
  try {
    const { id, token } = action.payload;
    const data = yield call(taskAnalyzerApi.taskAnalyze, id, token);

    yield put(taskAnalyzeSuccess(data));
  } catch (e: any) {
    yield put(taskAnalyzeFailure(e.message || 'Login failed'));
  }
}

export function* taskAnalyzerSaga() {
  yield takeEvery(taskAnalyzeRequest.type, taskAnalyzeSaga);
}
