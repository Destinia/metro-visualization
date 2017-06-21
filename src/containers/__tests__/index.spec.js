import { expect } from 'chai';
import * as containers from '../';


const {
  MainPage,
  NotFoundPage,
} = containers;

describe('containers', () => {
  it('exports all containers', () => {
    expect(MainPage).to.exist();
    expect(NotFoundPage).to.exist();
  });
});
