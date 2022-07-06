import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/services/auth/guard/auth.guard';
import { UserOverviewResolver } from './user-overview/resolver/user-overview.resolver';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import {AllUsersComponent} from "./all-users/all-users.component";
import {BudgetOverviewResolver} from "./all-users/resolver/budget-overview.resolver";

const routes: Routes = [
  {
    path: '',
    component: UserOverviewComponent,
    resolve: {
      userOverview: UserOverviewResolver,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'budget',
    component: AllUsersComponent,
    resolve: {
      allUsers: BudgetOverviewResolver,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
