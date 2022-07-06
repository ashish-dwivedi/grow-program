import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowDaysListComponent } from './grow-days-list.component';

describe('GrowDaysListComponent', () => {
  let component: GrowDaysListComponent;
  let fixture: ComponentFixture<GrowDaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowDaysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
