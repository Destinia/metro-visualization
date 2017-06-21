/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Main from '../';


const setup = ({ children }) => {
  const props = {
    children,
  };
  const component = shallow(
    <Main {...props} />
  );
  return {
    props,
    component,
  };
};


describe('components', () => {
  describe('Main', () => {
    xit('', () => {

    });
  });
});
