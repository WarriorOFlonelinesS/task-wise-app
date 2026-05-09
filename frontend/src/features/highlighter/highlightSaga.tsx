import { all, call, put, select, takeEvery } from 'redux-saga/effects';

// When you add a highlighter slice, import actions and wire workers:
import {
  getHighlightFailure,
  getHighlightRequest,
  getHighlightSuccess,
  postHighlightRequest,
} from './highlightSlice';
import * as highlighterApi from '../../api/highlightApi';
import { handleErrors } from '../../helpers/handleErrors';

function* getHightlightSaga(action: ReturnType<typeof getHighlightRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(getHighlightFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(highlighterApi.getHighlightsForTask, action.payload, token);
    yield put(getHighlightSuccess(data));
  } catch (e: any) {
    yield put(getHighlightFailure(handleErrors(e)));
  }
}

function* postHightlightSaga(action: ReturnType<typeof getHighlightRequest>) {
  const token = yield select((state) => state.auth.token);
  if (!token) {
    yield put(getHighlightFailure('No auth token found'));
    return;
  }
  try {
    const data = yield call(highlighterApi.postHighlight, action.payload, token);
    yield put(getHighlightSuccess(data));
  } catch (e: any) {
    yield put(getHighlightFailure(handleErrors(e)));
  }
}
/**
 * Root watcher for the highlighter feature.
 * Add `takeEvery` / `takeLatest` entries above and list them in `all([...])` below.
 */
export function* highlightSaga() {
  yield all([takeEvery(getHighlightRequest.type, getHightlightSaga)]);
  yield all([takeEvery(postHighlightRequest.type, postHightlightSaga)]);
}
