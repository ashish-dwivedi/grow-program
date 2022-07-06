import { TestBed } from '@angular/core/testing';

import { GrowDaysListResolver } from './grow-days-list.resolver';

describe('GrowDaysListResolver', () => {
  let resolver: GrowDaysListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GrowDaysListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
