import { TestBed } from '@angular/core/testing';

import { UserOverviewResolver } from './user-overview.resolver';

describe('UserOverviewResolver', () => {
  let resolver: UserOverviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserOverviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
