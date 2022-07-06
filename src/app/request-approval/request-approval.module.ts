import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RequestApprovalRoutingModule } from './request-approval-routing.module';
import { RequestApprovalComponent } from './request-approval/request-approval.component';

@NgModule({
  declarations: [RequestApprovalComponent],
  imports: [CommonModule, RequestApprovalRoutingModule, SharedModule],
})
export class RequestApprovalModule {}
