import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunitychatPage } from './communitychat.page';

describe('CommunitychatPage', () => {
  let component: CommunitychatPage;
  let fixture: ComponentFixture<CommunitychatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunitychatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
