import { fork } from 'redux-saga/effects';
import {
  watchCreatePredictionRequest,
  watchUpdatePredictionDataRequest,
  watchTestPredictionRequest,
  watchResetPredictionRequest,
} from './prediction';
// single entry point to start all Sagas at once
function* rootSaga() {
  yield [
    fork(watchCreatePredictionRequest),
    fork(watchUpdatePredictionDataRequest),
    fork(watchTestPredictionRequest),
    fork(watchResetPredictionRequest),
  ];
}

export default rootSaga;
