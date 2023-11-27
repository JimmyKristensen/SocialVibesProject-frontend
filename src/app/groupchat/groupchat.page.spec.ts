import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupchatPage } from './groupchat.page';

describe('GroupchatPage', () => {
  let component: GroupchatPage;
  let fixture: ComponentFixture<GroupchatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

