import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BFinancialComponent } from './bfinancial.component';

describe('BFinancialComponent', () => {
  let component: BFinancialComponent;
  let fixture: ComponentFixture<BFinancialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BFinancialComponent]
    });
    fixture = TestBed.createComponent(BFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
