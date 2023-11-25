import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvidchatPage } from './invidchat.page';

describe('InvidchatPage', () => {
  let component: InvidchatPage;
  let fixture: ComponentFixture<InvidchatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvidchatPage);
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
