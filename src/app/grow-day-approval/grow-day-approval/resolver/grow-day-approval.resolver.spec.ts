import { TestBed } from '@angular/core/testing';

import { GrowDayApprovalResolver } from './grow-day-approval.resolver';

describe('GrowDayApprovalResolver', () => {
  let resolver: GrowDayApprovalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GrowDayApprovalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
