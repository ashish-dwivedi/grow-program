import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrowDayStatusDialogComponent } from './update-grow-day-status-dialog.component';

describe('UpdateGrowDayStatusDialogComponent', () => {
  let component: UpdateGrowDayStatusDialogComponent;
  let fixture: ComponentFixture<UpdateGrowDayStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGrowDayStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGrowDayStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
