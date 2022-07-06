import { TestBed } from '@angular/core/testing';

import { RequestListResolver } from './request-list.resolver';

describe('RequestListResolver', () => {
  let resolver: RequestListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
