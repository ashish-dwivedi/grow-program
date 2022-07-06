import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { GrowDaysRoutingModule } from './grow-days-routing.module';
import { NewGrowDayComponent } from './new-grow-day/new-grow-day.component';
import { GrowDaysListComponent } from './grow-days-list/grow-days-list.component';

@NgModule({
  declarations: [NewGrowDayComponent, GrowDaysListComponent],
  imports: [CommonModule, GrowDaysRoutingModule, SharedModule],
})
export class GrowDaysModule {}
