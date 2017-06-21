import { fetchAPI } from './client';

export const createPrediction = timeInfo =>
  fetchAPI('/prediction', {
    method: 'POST',
    body: JSON.stringify(timeInfo),
  });

export const updateTrainData = data =>
  fetchAPI('/prediction/traindata', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const testPrediction = data =>
  fetchAPI('/prediction/test', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const resetPrediction = () =>
  fetchAPI('/prediction/reset', {
    method: 'DELETE',
  });
