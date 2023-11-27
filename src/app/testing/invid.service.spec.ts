import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvidService } from './invid.service';

describe('InvidService', () => {
  let service: InvidService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InvidService);
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

