/* eslint-disable global-require, import/newline-after-import */
import 'isomorphic-fetch';
import {
  createStack,
  createFetch,
  base,
  init,
  accept,
  header,
  parseJSON,
  onResponse,
} from 'http-client';

const throwIfNotOK = () => onResponse(response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.jsonData.error);
});

const middlewares = [
  base('/api'),
  init('credentials', 'same-origin'),
  accept('application/json'),
  header('Content-Type', 'application/json'),
  parseJSON(),
  throwIfNotOK(),
];


if (process.env.NODE_ENV === 'development') {
  const { log } = require('http-client-debug');
  middlewares.push(log());
}

export const stack = createStack(...middlewares);

export const fetchAPI = createFetch(stack);

