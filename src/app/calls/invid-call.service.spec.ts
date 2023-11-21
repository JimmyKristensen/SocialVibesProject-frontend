import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvidCallService } from './invid-call.service';

describe('InvidCallService', () => {
  let service: InvidCallService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InvidCallService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all chatsrooms', () => {
  service.getInvidChats().subscribe((chatrooms: any) => {

  });
  
  });
});
