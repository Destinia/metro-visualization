import createReducer from '../utils/createReducer';
import * as actions from '../actions/prediction';

const initialState = {};

const handlers = {
  [actions.CREATE_PREDICTION_SUCCESS]: (state, { payload }) => ({
    ...payload,
  }),
  [actions.TEST_PREDICTION_SUCCESS]: (state, { payload }) => ({
    ...payload,
  }),
  [actions.RESET_PREDICTION_SUCCESS]: () => ({}),
};

export default createReducer(initialState, handlers);
