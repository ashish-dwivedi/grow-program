import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NewRequestRoutingModule } from './new-request-routing.module';
import { RequestFormComponent } from './request-form/request-form.component';

@NgModule({
  declarations: [RequestFormComponent],
  imports: [CommonModule, NewRequestRoutingModule, SharedModule],
})
export class NewRequestModule {}
