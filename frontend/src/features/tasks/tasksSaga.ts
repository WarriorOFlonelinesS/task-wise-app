import * as tasksApi from '../../api/tasksApi';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getTasksSuccess,
  getTasksFailure,
  getTasksRequest,
  postTasksSuccess,
  postTasksFailure,
  postTasksRequest,
  deleteTasksRequest,
  deleteTasksSuccess,
  deleteTasksFailure,
  updateTasksSuccess,
  updateTasksFailure,
  updateTasksRequest,
} from './tasksSlice';

function* getTasksSaga(action: ReturnType<typeof getTasksRequest>) {
  try {
    const data = yield call(tasksApi.getTasks, action.payload);
    yield put(getTasksSuccess(data));
  } catch (e: any) {
    yield put(getTasksFailure(e.message));
  }
}

function* postTaskSaga(action: ReturnType<typeof postTasksRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(postTasksFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(tasksApi.postTasks, action.payload, token);
    yield put(postTasksSuccess(data));
  } catch (e: any) {
    yield put(postTasksFailure(e.message));
  }
}

function* deleteTaskSaga(action: ReturnType<typeof postTasksRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(deleteTasksFailure('No auth token found'));
    return;
  }
  try {
    yield call(tasksApi.deleteTasks, action.payload, token);
    yield put(deleteTasksSuccess(action.payload));
  } catch (e: any) {
    yield put(deleteTasksFailure(e.message));
  }
}

function* updateTaskSaga(action: ReturnType<typeof updateTasksRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(updateTasksFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(tasksApi.updateTasks, action.payload, token);
    // If API returns the updated task directly, use it; otherwise use the payload
    const updatedTask = data.task || data || action.payload;
    yield put(updateTasksSuccess(updatedTask));
  } catch (e: any) {
    yield put(updateTasksFailure(e.message));
  }
}

export function* tasksSaga() {
  yield takeEvery(getTasksRequest.type, getTasksSaga);
  yield takeEvery(postTasksRequest.type, postTaskSaga);
  yield takeEvery(deleteTasksRequest.type, deleteTaskSaga);
  yield takeEvery(updateTasksRequest.type, updateTaskSaga);
}
