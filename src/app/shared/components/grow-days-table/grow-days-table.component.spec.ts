import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowDaysTableComponent } from './grow-days-table.component';

describe('GrowDaysTableComponent', () => {
  let component: GrowDaysTableComponent;
  let fixture: ComponentFixture<GrowDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowDaysTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
