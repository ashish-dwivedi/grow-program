import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrowDaysListComponent } from './grow-days-list/grow-days-list.component';
import { GrowDaysListResolver } from './grow-days-list/resolver/grow-days-list.resolver'

const routes: Routes = [
  {
    path: '',
    component: GrowDaysListComponent,
    resolve: {
      allGrowDays: GrowDaysListResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowDaysRoutingModule {}
