import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducer from '../reducers';
import { firebaseConfig } from '../config/config';


const router = routerMiddleware(browserHistory);

const saga = createSagaMiddleware();

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, saga, router, thunk.withExtraArgument(getFirebase)),
      reactReduxFirebase(firebaseConfig, { userProfile: 'users' })
    )
  );

  store.runSaga = saga.run;

  return store;
};


export default configureStore;
