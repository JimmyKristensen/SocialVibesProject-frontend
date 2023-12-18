import { TestBed } from '@angular/core/testing';

import { PostChatService } from './post-chat.service';

describe('CreateChatService', () => {
  let service: PostChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
