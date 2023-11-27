import { TestBed } from '@angular/core/testing';

import { ChatroomCallsService } from './chatroom-calls.service';

describe('ChatroomCallsService', () => {
  let service: ChatroomCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatroomCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
