import { TestBed } from '@angular/core/testing';

import { InvidCallService } from './invid-call.service';

describe('InvidService', () => {
  let service: InvidCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvidCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});