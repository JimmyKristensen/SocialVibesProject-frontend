import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventcreatePage } from './eventcreate.page';

describe('EventcreatePage', () => {
  let component: EventcreatePage;
  let fixture: ComponentFixture<EventcreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventcreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
