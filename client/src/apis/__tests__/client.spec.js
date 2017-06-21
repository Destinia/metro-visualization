/* eslint-disable no-console */
import 'isomorphic-fetch';

import { expect } from 'chai';
import { spy } from 'sinon';
import { enhanceFetch } from 'http-client';
import requireUncached from 'require-uncached';
import { stack } from '../client';

const echo = (input, options) => Promise.resolve({ input, options });

const echoJSON = (json) =>
  enhanceFetch(
    () => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(json),
    })
  );

const echoNotOkJson = (json) =>
  enhanceFetch(
    () => Promise.resolve({
      status: 401,
      json: () => Promise.resolve(json),
    })
  );

describe('stack', () => {
  beforeEach(() => {
    spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should have Accept application/json header', async () =>
    stack(echo).then(({ options }) =>
      expect(options.headers.Accept).to.equal('application/json')
    )
  );

  it('should have Content-Type application/json header', async () =>
    stack(echo).then(({ options }) =>
      expect(options.headers['Content-Type']).to.equal('application/json')
    )
  );

  it('should set credentials to "same-origin"', async () =>
    stack(echo).then(({ options }) =>
      expect(options.credentials).to.equal('same-origin')
    )
  );

  it('should sets the base URL to /api', async () =>
    stack(echo, '/users').then(({ input }) =>
      expect(input).to.equal('/api/users')
    )
  );

  it('should parse JSON to jsonData property', async () =>
    stack(echoJSON({ hello: 'world' })).then(res =>
      expect(res.jsonData).to.deep.equal({ hello: 'world' })
    )
  );

  it('should throw error with not OK responses', async () => {
    const expectedErr = new Error('bad happens!');
    let error;

    try {
      await stack(echoNotOkJson({ error: 'bad happens!' }));
    } catch (err) {
      error = err;
    }
    expect(error).to.deep.equal(expectedErr);
  });

  it('should not throw error with OK responses', async () => {
    let error;

    try {
      await stack(echoJSON({ hello: 'world' }));
    } catch (err) {
      error = err;
    }
    expect(error).to.be.undefined();
  });

  it('should not log response', async () => {
    await stack(echoJSON({ hello: 'world' }));
    expect(console.log).to.not.have.been.called();
  });

  describe('dev middlewares', () => {
    let _ENV;
    beforeEach(() => {
      _ENV = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = _ENV;
    });

    it('should log response in dev environment', async () => {
      const devStack = requireUncached('../client').stack;
      const res = await devStack(echoJSON({ hello: 'world' }));
      expect(console.log).to.have.been.calledWith('Get "response": ', res);
    });
  });
});
