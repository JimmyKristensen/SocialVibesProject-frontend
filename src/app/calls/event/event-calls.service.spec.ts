import { TestBed } from '@angular/core/testing';

import { EventCallsService } from './event-calls.service';

describe('EventCallsService', () => {
  let service: EventCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
