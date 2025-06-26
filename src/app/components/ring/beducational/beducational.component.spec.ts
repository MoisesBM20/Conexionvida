import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BEducationalComponent } from './beducational.component';

describe('BEducationalComponent', () => {
  let component: BEducationalComponent;
  let fixture: ComponentFixture<BEducationalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BEducationalComponent]
    });
    fixture = TestBed.createComponent(BEducationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
