import { TestBed } from '@angular/core/testing';

import { RequestApprovalResolver } from './request-approval.resolver';

describe('ApprovalResolver', () => {
  let resolver: RequestApprovalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestApprovalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
