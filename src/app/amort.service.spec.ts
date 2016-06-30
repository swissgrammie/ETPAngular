/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AmortService } from './amort.service';

describe('Amort Service', () => {
  beforeEachProviders(() => [AmortService]);

  it('should ...',
      inject([AmortService], (service: AmortService) => {
    expect(service).toBeTruthy();
  }));
});
