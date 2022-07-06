import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowDayApprovalComponent } from './grow-day-approval.component';

describe('GrowDayApprovalComponent', () => {
  let component: GrowDayApprovalComponent;
  let fixture: ComponentFixture<GrowDayApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowDayApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowDayApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
