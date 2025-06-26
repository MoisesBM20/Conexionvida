import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BMentalComponent } from './bmental.component';

describe('BMentalComponent', () => {
  let component: BMentalComponent;
  let fixture: ComponentFixture<BMentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BMentalComponent]
    });
    fixture = TestBed.createComponent(BMentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
