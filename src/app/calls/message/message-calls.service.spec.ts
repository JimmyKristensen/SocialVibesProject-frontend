import { TestBed } from '@angular/core/testing';

import { MessageCallsService } from './message-calls.service';

describe('MessageCallsService', () => {
  let service: MessageCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
