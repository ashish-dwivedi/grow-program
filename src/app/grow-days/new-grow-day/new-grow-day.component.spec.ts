import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGrowDayComponent } from './new-grow-day.component';

describe('NewGrowDayComponent', () => {
  let component: NewGrowDayComponent;
  let fixture: ComponentFixture<NewGrowDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGrowDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGrowDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
