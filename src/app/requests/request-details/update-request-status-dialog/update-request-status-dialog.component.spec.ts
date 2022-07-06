import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestStatusDialogComponent } from './update-request-status-dialog.component';

describe('UpdateRequestStatusDialogComponent', () => {
  let component: UpdateRequestStatusDialogComponent;
  let fixture: ComponentFixture<UpdateRequestStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
