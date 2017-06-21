/* eslint-disable global-require */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import rootSaga from './sagas';


const store = configureStore();
store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('root');

let app;

if (module.hot) {
  app = (
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  );

  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;

    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
} else {
  app = <Root store={store} history={history} />;
}

render(app, rootElement);

