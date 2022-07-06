import { TestBed } from '@angular/core/testing';

import { GrowDaysService } from './grow-days.service';

describe('GrowDaysService', () => {
  let service: GrowDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
