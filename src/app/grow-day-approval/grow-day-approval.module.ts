import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { GrowDayApprovalRoutingModule } from './grow-day-approval-routing.module';
import { GrowDayApprovalComponent } from './grow-day-approval/grow-day-approval.component';


@NgModule({
  declarations: [
    GrowDayApprovalComponent
  ],
  imports: [
    CommonModule,
    GrowDayApprovalRoutingModule,
    SharedModule
  ]
})
export class GrowDayApprovalModule { }
