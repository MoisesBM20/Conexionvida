import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BPhysicalComponent } from './bphysical.component';

describe('BPhysicalComponent', () => {
  let component: BPhysicalComponent;
  let fixture: ComponentFixture<BPhysicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BPhysicalComponent]
    });
    fixture = TestBed.createComponent(BPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
