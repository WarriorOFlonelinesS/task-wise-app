import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { tasksSaga } from '../features/tasks/tasksSaga';

export default function* rootSaga() {
  yield all([authSaga(), tasksSaga()]);
}
