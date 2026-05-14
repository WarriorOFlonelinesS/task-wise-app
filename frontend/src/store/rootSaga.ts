import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { tasksSaga } from '../features/tasks/tasksSaga';
import { profileSaga } from '../features/profile/profileSaga';
import { highlightSaga } from '../features/highlighter/highlightSaga';
import { statisticSaga } from '../features/statistic/statisticSaga';

export default function* rootSaga() {
  yield all([authSaga(), tasksSaga(), profileSaga(), highlightSaga(), statisticSaga()]);
}
