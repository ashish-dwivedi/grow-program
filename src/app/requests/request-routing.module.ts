import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestDetailsResolver } from './request-details/resolver/request-details.resolver';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestListResolver } from './request-list/resolver/request-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: RequestListComponent,
    resolve: {
      requestHistoryList: RequestListResolver,
    },
  },
  {
    path: ':id',
    component: RequestDetailsComponent,
    resolve: {
      requestDetails: RequestDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
