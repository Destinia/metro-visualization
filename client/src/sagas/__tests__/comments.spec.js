import { expect } from 'chai';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  fetchComments,
  watchFetchCommentsRequest,
} from '../comments';
import * as api from '../../apis';
import * as actions from '../../actions/comments';


describe('sagas', () => {
  describe('Comments', () => {
    describe('* fetchComments', () => {
      it('should call fetchComments api', () => {
        const payload = 'test';
        const generator = fetchComments({ payload });
        expect(generator.next().value).to.deep.equal(call(api.fetchComments, payload));
      });

      it('should put FETCH_COMMENTS_SUCCESS action when successed', () => {
        const payload = 'test';
        const generator = fetchComments({ payload });
        generator.next();
        const hotNews = [];
        const next = generator.next({ jsonData: hotNews });
        expect(next.value).to.deep.equal(put(actions.fetchCommentsSuccess(hotNews)));
      });

      it('should put FETCH_COMMENTS_FAIL action when error thrown', () => {
        const payload = 'test';
        const generator = fetchComments({ payload });
        generator.next();
        const error = new Error('some error');
        expect(generator.throw(error).value).to.deep.equal(
          put(actions.fetchCommentsFail(error))
        );
      });

      it('should finish after put action', () => {
        const payload = 'test';
        const generator = fetchComments({ payload });
        generator.next();
        const hotNews = [];
        generator.next({ jsonData: hotNews });
        const next = generator.next();
        expect(next.done).to.be.true();
      });
    });

    describe('* watchFetchCommentsRequest', () => {
      it('should take latest FETCH_COMMENTS_REQUEST', () => {
        const generator = watchFetchCommentsRequest();
        expect(generator.next().value.name).to.deep.equal(
          takeLatest('FETCH_COMMENTS_REQUEST', fetchComments).name
        );
      });

      it('should finish after took action', () => {
        const generator = watchFetchCommentsRequest();
        generator.next();
        expect(generator.next().done).to.be.true();
      });
    });
  });
});
