import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as api from '../apis';
import * as actions from '../actions/prediction';

export function* createPrediction({ payload }) {
  try {
    const response = yield call(api.createPrediction, payload);
    const prediction = response.jsonData;
    yield put(actions.createPredictionSuccess(prediction));
  } catch (err) {
    yield put(actions.createPredictionFail(err));
  }
}

export function* updatePredictionData({ payload }) {
  try {
    const response = yield call(api.updateTrainData, payload);
    const { success } = response.jsonData;
    if (success) {
      yield put(actions.updatePredictionDataSuccess());
    } else {
      throw new Error('update prediction data error');
    }
  } catch (err) {
    yield put(actions.updatePredictionDataFail(err));
  }
}

export function* testPrediction({ payload }) {
  try {
    const response = yield call(api.testPrediction, payload);
    const prediction = response.jsonData;
    yield put(actions.testPredictionSuccess(prediction));
  } catch (err) {
    yield put(actions.testPredictionFail(err));
  }
}

export function* resetPrediction() {
  try {
    const response = yield call(api.resetPrediction);
    const { success } = response.jsonData;
    if (success) {
      yield put(actions.resetPredictionSuccess());
    } else {
      throw new Error('reset prediction data error');
    }
  } catch (err) {
    yield put(actions.resetPredictionFail(err));
  }
}

export function* watchCreatePredictionRequest() {
  yield takeLatest(actions.CREATE_PREDICTION_REQUEST, createPrediction);
}

export function* watchUpdatePredictionDataRequest() {
  yield takeLatest(actions.UPDATE_PREDICTION_DATA_REQUEST, updatePredictionData);
}

export function* watchTestPredictionRequest() {
  yield takeLatest(actions.TEST_PREDICTION_REQUEST, testPrediction);
}

export function* watchResetPredictionRequest() {
  yield takeLatest(actions.RESET_PREDICTION_REQUEST, resetPrediction);
}
