import { expect } from 'chai';
import rootSaga from '../';
import {
  watchFetchHotNewsRequest,
} from '../hotNews';

describe('sagas', () => {
  describe('rootSaga', () => {
    it('should include sagas needed', () => {
      const generator = rootSaga();
      const sagas = generator.next().value;
      expect(sagas).to.be.instanceof(Array);
      const sagaFns = sagas.map(saga => saga.FORK.fn);
      expect(sagaFns).to.include(watchFetchHotNewsRequest);
    });

    it('should yield only one time', () => {
      const generator = rootSaga();
      generator.next();
      expect(generator.next().done).to.be.true();
    });
  });
});
