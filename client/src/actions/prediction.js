export const CREATE_PREDICTION_REQUEST = 'CREATE_PREDICTION_REQUEST';
export const CREATE_PREDICTION_SUCCESS = 'CREATE_PREDICTION_SUCCESS';
export const CREATE_PREDICTION_FAIL = 'CREATE_PREDICTION_FAIL';
export const UPDATE_PREDICTION_DATA_REQUEST = 'UPDATE_PREDICTION_DATA_REQUEST';
export const UPDATE_PREDICTION_DATA_SUCCESS = 'UPDATE_PREDICTION_DATA_SUCCESS';
export const UPDATE_PREDICTION_DATA_FAIL = 'UPDATE_PREDICTION_DATA_FAIL';
export const TEST_PREDICTION_REQUEST = 'TEST_PREDICTION_REQUEST';
export const TEST_PREDICTION_SUCCESS = 'TEST_PREDICTION_SUCCESS';
export const TEST_PREDICTION_FAIL = 'TEST_PREDICTION_FAIL';
export const RESET_PREDICTION_REQUEST = 'RESET_PREDICTION_REQUEST';
export const RESET_PREDICTION_SUCCESS = 'RESET_PREDICTION_SUCCESS';
export const RESET_PREDICTION_FAIL = 'RESET_PREDICTION_FAIL';

export const createPredictionRequest = payload => ({
  type: CREATE_PREDICTION_REQUEST,
  payload,
});

export const createPredictionSuccess = payload => ({
  type: CREATE_PREDICTION_SUCCESS,
  payload,
});

export const createPredictionFail = err => ({
  type: CREATE_PREDICTION_FAIL,
  error: true,
  payload: err,
});

export const updatePredictionDataRequest = payload => ({
  type: UPDATE_PREDICTION_DATA_REQUEST,
  payload,
});

export const updatePredictionDataSuccess = payload => ({
  type: UPDATE_PREDICTION_DATA_SUCCESS,
  payload,
});

export const updatePredictionDataFail = err => ({
  type: UPDATE_PREDICTION_DATA_FAIL,
  error: true,
  payload: err,
});

export const testPredictionRequest = payload => ({
  type: TEST_PREDICTION_REQUEST,
  payload,
});

export const testPredictionSuccess = payload => ({
  type: TEST_PREDICTION_SUCCESS,
  payload,
});

export const testPredictionFail = err => ({
  type: TEST_PREDICTION_FAIL,
  error: true,
  payload: err,
});

export const resetPredictionRequest = payload => ({
  type: RESET_PREDICTION_REQUEST,
  payload,
});

export const resetPredictionSuccess = payload => ({
  type: RESET_PREDICTION_SUCCESS,
  payload,
});

export const resetPredictionFail = err => ({
  type: RESET_PREDICTION_FAIL,
  error: true,
  payload: err,
});
