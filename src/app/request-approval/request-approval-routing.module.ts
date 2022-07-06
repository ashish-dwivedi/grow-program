import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { AuthGuard } from '../core/services/auth/guard/auth.guard';
import {RequestApprovalResolver} from "./resolver/request-approval.resolver";

const routes: Routes = [
  {
    path: '',
    component: RequestApprovalComponent,
    canActivate: [AuthGuard],
    resolve: {
      pendingRequests: RequestApprovalResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestApprovalRoutingModule {}
