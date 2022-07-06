import { TestBed } from '@angular/core/testing';

import { NewRequestService } from './new-request.service';

describe('NewResourceService', () => {
  let service: NewRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
