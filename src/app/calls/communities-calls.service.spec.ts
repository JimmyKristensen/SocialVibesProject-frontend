import { TestBed } from '@angular/core/testing';

import { CommunitiesCallsService } from './communities-calls.service';

describe('CommunitiesCallsService', () => {
  let service: CommunitiesCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunitiesCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
