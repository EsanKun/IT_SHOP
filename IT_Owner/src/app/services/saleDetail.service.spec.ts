/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaleDetailService } from './saleDetail.service';

describe('Service: SaleDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleDetailService]
    });
  });

  it('should ...', inject([SaleDetailService], (service: SaleDetailService) => {
    expect(service).toBeTruthy();
  }));
});
