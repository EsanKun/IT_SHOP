/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestMixProductService } from './testMixProduct.service';

describe('Service: TestMixProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestMixProductService]
    });
  });

  it('should ...', inject([TestMixProductService], (service: TestMixProductService) => {
    expect(service).toBeTruthy();
  }));
});
