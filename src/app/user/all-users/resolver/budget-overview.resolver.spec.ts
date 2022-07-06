import { TestBed } from '@angular/core/testing';

import { BudgetOverviewResolver } from './budget-overview.resolver';

describe('BudgetOverviewResolver', () => {
  let resolver: BudgetOverviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BudgetOverviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
