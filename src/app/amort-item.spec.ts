/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {AmortItem} from './amort-item';

describe('AmortItem', () => {
  it('should create an instance', () => {
    expect(new AmortItem("jan",1,1)).toBeTruthy();
  });
});
