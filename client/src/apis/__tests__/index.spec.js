import { expect } from 'chai';
import * as api from '../';

describe('api', () => {
  it('should export correctly', () => {
    expect(api.fetchHotNews).to.be.a('function');
    expect(api.fetchHotNewsWithDate).to.be.a('function');
    expect(api.fetchComments).to.be.a('function');
  });
});
