import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestListComponent } from './request-list/request-list.component';
import { UpdateRequestStatusDialogComponent } from './request-details/update-request-status-dialog/update-request-status-dialog.component';

@NgModule({
  declarations: [RequestListComponent, RequestDetailsComponent, UpdateRequestStatusDialogComponent],
  imports: [CommonModule, RequestRoutingModule, SharedModule],
  exports: [],
})
export class RequestModule {}
