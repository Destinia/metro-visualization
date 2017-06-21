import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Router, createMemoryHistory, useRouterHistory } from 'react-router';
import createRoutes from '../createRoutes';
import * as containers from '../containers';


const {
  App,
  MainPage,
  NotFoundPage,
} = containers;

const createStubStore = () => ({
  getState() {
    return {};
  },
});

const renderRoute = (path) => {
  const history = useRouterHistory(createMemoryHistory)({ queryKey: false });
  history.push(path);
  const store = createStubStore();
  const router = shallow(
    <Router history={history} routes={createRoutes(store)} />
  );
  return router.renderer.getRenderOutput().props;
};

const expectIncludeComponents = (components, expectedComponents) => {
  expectedComponents.forEach(comp => {
    expect(components).to.include(comp);
  });
};

describe('routes', () => {
  describe('/', () => {
    it('renders MainPage', () => {
      const { components } = renderRoute('/');
      expectIncludeComponents(components, [App, MainPage]);
    });
  });

  describe('not found route', () => {
    it('dose not match any routes should render NotFoundPage', () => {
      const { components } = renderRoute('/page-not-found');
      expectIncludeComponents(components, [App, NotFoundPage]);
    });
  });
});
