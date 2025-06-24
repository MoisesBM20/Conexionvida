import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanefamilyComponent } from './ganefamily.component';

describe('GanefamilyComponent', () => {
  let component: GanefamilyComponent;
  let fixture: ComponentFixture<GanefamilyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GanefamilyComponent]
    });
    fixture = TestBed.createComponent(GanefamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
