import { expect } from 'chai';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  fetchHotNews,
  watchFetchHotNewsRequest,
} from '../hotNews';
import * as api from '../../apis';
import * as actions from '../../actions/hotNews';

describe('sagas', () => {
  describe('hotNews', () => {
    describe('* fetchHotNews', () => {
      it('should call fetchHotNews api', () => {
        const generator = fetchHotNews();
        expect(generator.next().value).to.deep.equal(call(api.fetchHotNews));
      });

      it('should put FETCH_HOTNEWS_SUCCESS action when successed', () => {
        const generator = fetchHotNews();
        generator.next();
        const hotNews = [];
        const next = generator.next({ jsonData: hotNews });
        expect(next.value).to.deep.equal(put(actions.fetchHotNewsSuccess(hotNews)));
      });

      it('should put FETCH_HOTNEWS_FAIL action when error thrown', () => {
        const generator = fetchHotNews();
        generator.next();
        const error = new Error('some error');
        expect(generator.throw(error).value).to.deep.equal(
          put(actions.fetchHotNewsFail(error))
        );
      });

      it('should finish after put action', () => {
        const generator = fetchHotNews();
        generator.next();
        const hotNews = [];
        generator.next({ jsonData: hotNews });
        const next = generator.next();
        expect(next.done).to.be.true();
      });
    });

    describe('* watchFetchHotNewsRequest', () => {
      it('should take latest FETCH_HOTNEWS_REQUEST', () => {
        const generator = watchFetchHotNewsRequest();

        expect(generator.next().value.name).to.deep.equal(
          takeLatest('FETCH_HOTNEWS_REQUEST', fetchHotNews).name
        );
      });

      it('should finish after took action', () => {
        const generator = watchFetchHotNewsRequest();
        generator.next();

        expect(generator.next().done).to.be.true();
      });
    });
  });
});
