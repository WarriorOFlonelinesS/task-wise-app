import * as analyticApi from '../../api/analycticApi'
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getStatisticSuccess,
  getStatisticFailure,
  getStatisticRequest,
} from './statisticSlice';
import { handleErrors } from '../../helpers/handleErrors';

function* getStatisticSaga(action: ReturnType<typeof getStatisticRequest>) {
  try {
    console.log(action.payload)
    const data = yield call(analyticApi.getTasksAnalitics, action.payload);
    yield put(getStatisticSuccess(data));
    console.log(data)
  } catch (e: any) {
    yield put(getStatisticFailure(handleErrors(e)));
  }
}


export function* statisticSaga() {
  yield takeEvery(getStatisticRequest.type, getStatisticSaga);
}
