import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventmodalPage } from './eventmodal.page';

describe('EventmodalPage', () => {
  let component: EventmodalPage;
  let fixture: ComponentFixture<EventmodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
