import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/services/auth/guard/auth.guard';
import { GrowDayApprovalComponent } from './grow-day-approval/grow-day-approval.component';
import { GrowDayApprovalResolver } from './grow-day-approval/resolver/grow-day-approval.resolver';

const routes: Routes = [
  {
    path: '',
    component: GrowDayApprovalComponent,
    canActivate: [AuthGuard],
    resolve: {
      allGrowDays: GrowDayApprovalResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowDayApprovalRoutingModule {}
