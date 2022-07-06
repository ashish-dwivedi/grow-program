import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AppRoutes } from './shared/enums'

const routes: Routes = [
  {
    path: AppRoutes.Dashboard,
    pathMatch: 'full',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: AppRoutes.NewRequest,
    loadChildren: () => import('./new-request/new-request.module').then((m) => m.NewRequestModule),
  },
  {
    path: AppRoutes.Request,
    loadChildren: () => import('./requests/request.module').then((m) => m.RequestModule),
  },
  {
    path: AppRoutes.User,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: AppRoutes.RequestApproval,
    loadChildren: () =>
      import('./request-approval/request-approval.module').then((m) => m.RequestApprovalModule),
  },
  {
    path: AppRoutes.GrowDay,
    loadChildren: () => import('./grow-days/grow-days.module').then((m) => m.GrowDaysModule),
  },
  {
    path: AppRoutes.DayApproval,
    loadChildren: () =>
      import('./grow-day-approval/grow-day-approval.module').then((m) => m.GrowDayApprovalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
