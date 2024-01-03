import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventJoinedPage } from './event-joined.page';

describe('EventJoinedPage', () => {
  let component: EventJoinedPage;
  let fixture: ComponentFixture<EventJoinedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventJoinedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
