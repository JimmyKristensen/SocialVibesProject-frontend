import { TestBed } from '@angular/core/testing';

import { InvidCallService } from './invid-call.service';

describe('InvidCallService', () => {
  let service: InvidCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvidCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
