import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Import async here

import { FrontpagePage } from './frontpage.page';

describe('FrontpagePage', () => {
  let component: FrontpagePage;
  let fixture: ComponentFixture<FrontpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontpagePage],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FrontpagePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
